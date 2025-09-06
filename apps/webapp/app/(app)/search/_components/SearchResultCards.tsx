import Link from "next/link";
import {
  HardDriveDownload,
  CalendarArrowUp,
  ArrowsUpFromLine,
  ArrowDownUp,
} from "lucide-react";
import MagnetLinkButton from "./MagenetLinkButton";
import { formatBytes, truncate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import DownloadWebtorButton from "./DownloadWebtorButton";
import { useSession } from "@/lib/auth-client";
import { saveTorrent } from "../action";
import { toast } from "sonner";
import BookmarkButton from "./BookmarkButton";

export type SearchResultCardsProps = {
  title: string;
  jackettindexer: {
    id: string;
    name: string;
  };
  size: string;
  pubDate: string;
  description: string;
  magnetLink: string;
  seeders: number;
  peers: number;
  attrs: {
    infohash: string;
  };
};

export default function SearchResultCards({
  title,
  jackettindexer,
  size,
  pubDate,
  description,
  magnetLink,
  seeders,
  peers,
  attrs,
}: SearchResultCardsProps) {
  const { data: session } = useSession();

  const handleSaveTorrent = async () => {
    const result = await saveTorrent({
      title,
      dateUploaded: pubDate,
      size: parseInt(size),
      seeders,
      peers,
      magnetLink,
      infohash: attrs.infohash,
    })

    if (result.error) {
      toast.error("Failed to bookmark torrent", {
        description: "Please try again",
      });
    } else {
      toast.success("Torrent bookmarked", {
        description: "You can find it in your bookmarks",
      });
    }
  } 

  return (
    <div className="bg-zinc-100/50 dark:bg-[#111111]/50 rounded-lg p-4">
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Link
            href={magnetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md mb-1 font-medium"
          >
            {truncate(title, 80)}
          </Link>
        </div>

        <div className="flex items-center gap-4 text-sm mb-2">
          <Badge variant="secondary" className="flex items-center gap-1">
            <p>{jackettindexer.name}</p>
          </Badge>
          <Tooltip>
            <TooltipTrigger>
              <div className="flex items-center gap-1">
                <CalendarArrowUp className="size-4" />
                <p>
                  {new Date(pubDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>
                {new Date(pubDate).toLocaleString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: true,
                })}
              </p>
            </TooltipContent>
          </Tooltip>
        </div>

        <div className="flex items-center gap-1 mb-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <ArrowsUpFromLine className="size-4" />
            <p>Seeds: {seeders}</p>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <ArrowDownUp className="size-4" />
            <p>Peers: {peers}</p>
          </Badge>
          <Badge variant="outline" className="flex items-center gap-1">
            <HardDriveDownload className="size-4" />
            <p>{formatBytes(size)}</p>
          </Badge>
        </div>
        <p
          className="max-w-[60ch] text-sm text-muted-foreground"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>

      <div className="flex items-center gap-2 mt-3">
        <MagnetLinkButton magnetLink={magnetLink} />
        {attrs.infohash && <DownloadWebtorButton infoHash={attrs.infohash} />}
        {session && <BookmarkButton handleSaveTorrent={handleSaveTorrent} />}
      </div>
    </div>
  );
}

export function SearchResultCardsSkeleton() {
  return (
    <div className="flex flex-col gap-2 max-w-3xl bg-secondary p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="w-full h-8 bg-secondary-foreground/20 dark:bg-primary-foreground animate-pulse" />
          <div className="h-8 bg-secondary-foreground/20 dark:bg-primary-foreground animate-pulse w-1/3" />
        </div>
        <div className="w-full h-20 bg-secondary-foreground/20 dark:bg-primary-foreground animate-pulse flex items-center justify-center"></div>
      </div>
    </div>
  );
}
