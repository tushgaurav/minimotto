from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import requests
import os
import xml.etree.ElementTree as ET
from pydantic import BaseModel
import libtorrent as lt
import time

load_dotenv()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class TorrentItem(BaseModel):
    magnetLink: str


@app.get("/")
def read_root():
    return {}


DOWNLOAD_DIR = "./downloads"
METADATA_TIMEOUT_SECONDS = 15


def get_metadata_from_magnet(magnet_link: str) -> dict:
    """
    Fetches metadata from a given magnet link using libtorrent and returns it as JSON.

    Args:
        magnet_link (str): The magnet URI string.

    Returns:
        dict: Metadata information including name, size, files and status. Returns error details if metadata fetch fails.
    """
    # Create a libtorrent session
    ses = lt.session({'listen_interfaces': '0.0.0.0:6881'})

    # Prepare parameters for adding the torrent
    params = lt.add_torrent_params()
    params.save_path = DOWNLOAD_DIR
    params.url = magnet_link

    try:
        handle = ses.add_torrent(params)
    except Exception as e:
        return {
            "status": "error",
            "error": str(e)
        }

    start_time = time.time()

    # Wait for metadata to be available
    while (not handle.has_metadata()) and ((time.time() - start_time) < METADATA_TIMEOUT_SECONDS):
        time.sleep(1)

    result = {}

    if handle.has_metadata():
        torrent_info = handle.torrent_file()

        files = []
        for i in range(torrent_info.num_files()):
            file_entry = torrent_info.file_at(i)
            files.append({
                "path": str(file_entry.path),
                "size": file_entry.size
            })

        result = {
            "status": "success",
            "name": torrent_info.name(),
            "total_size": torrent_info.total_size(),
            "num_files": torrent_info.num_files(),
            "files": files
        }
    else:
        result = {
            "status": "error",
            "error": f"Failed to fetch metadata within {METADATA_TIMEOUT_SECONDS} seconds",
            "possible_causes": [
                "No active peers for the magnet link",
                "Firewall issues preventing connections",
                "The magnet link being invalid or very old"
            ]
        }

    try:
        ses.remove_torrent(handle)
    except Exception as e:
        result["removal_error"] = str(e)

    return result


@app.post("/torrent-health/")
async def check_health(torrent: TorrentItem):
    magnet_link = torrent.magnetLink

    metadata = get_metadata_from_magnet(magnet_link)
    return {"metadata": metadata}


@app.get("/search/")
async def search(q: str, page: int = 1):
    """
    Search for torrents using Jackett API and return formatted results with pagination.
    Args:
        q (str): Search query string
        page (int): Page number (default 1)
    Returns:
        list: List of dictionaries containing formatted torrent information
    """
    jackett_url = os.getenv("JACKETT_URL")
    jackett_api_key = os.getenv("JACKETT_API_KEY")

    full_url = f"{jackett_url}/api/v2.0/indexers/all/results/torznab/api?apikey={jackett_api_key}&t=search&q={q}"
    response = requests.get(full_url)

    # Parse XML response
    root = ET.fromstring(response.content)

    def format_size(size_bytes: int) -> str:
        """Convert bytes to human readable string."""
        for unit in ['B', 'KB', 'MB', 'GB', 'TB']:
            if size_bytes < 1024:
                return f"{size_bytes:.2f} {unit}"
            size_bytes /= 1024
        return f"{size_bytes:.2f} TB"

    results = []
    for item in root.findall(".//item"):
        indexer_name = item.find("jackettindexer").text

        description = item.find("description").text

        seeders = item.find(".//torznab:attr[@name='seeders']",
                            {"torznab": "http://torznab.com/schemas/2015/feed"})
        peers = item.find(".//torznab:attr[@name='peers']",
                          {"torznab": "http://torznab.com/schemas/2015/feed"})

        torrent = {
            "title": item.find("title").text,
            "pubDate": item.find("pubDate").text,
            "size": format_size(int(item.find("size").text)),
            "indexer": indexer_name,
            "seeders": int(seeders.get("value")),
            "peers": int(peers.get("value")),
            "description": description,
            "magnetLink": item.find("guid").text
        }
        results.append(torrent)

    # Pagination logic
    PAGE_SIZE = 15
    start = (page - 1) * PAGE_SIZE
    end = start + PAGE_SIZE
    paginated_results = results[start:end]
    return {
        "page": page,
        "page_size": PAGE_SIZE,
        "total_results": len(results),
        "results": paginated_results
    }
