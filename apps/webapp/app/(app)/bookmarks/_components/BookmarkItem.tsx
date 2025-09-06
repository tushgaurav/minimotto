"use client";

import Link from "next/link";
import { Torrent } from "@/types/core";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    CalendarArrowUp,
    ArrowsUpFromLine,
    ArrowDownUp,
    HardDriveDownload,
    Trash,
} from "lucide-react";
import MagnetLinkButton from "@/app/(app)/search/_components/MagenetLinkButton";
import DownloadWebtorButton from "@/app/(app)/search/_components/DownloadWebtorButton";
import { formatBytes, truncate } from "@/lib/utils";
import { toast } from "sonner";
import { saveTorrent } from "../action";
import { useRouter } from "next/navigation";

export default function BookmarkItem({ torrent }: { torrent: Torrent }) {
    const router = useRouter();
    
    const handleDelete = async () => {
        const result = await saveTorrent(torrent, "delete");
        if ("error" in result) {
            toast.error("Failed to remove bookmark", { description: "Please try again" });
        } else {
            toast.success("Bookmark removed");
        }

        router.refresh();
    };

    return (
        <div className="bg-zinc-100/50 dark:bg-[#111111]/50 rounded-lg p-4">
            <div className="flex flex-col">
                <div className="flex items-center gap-2">
                    <Link
                        href={torrent.magnetLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-md mb-1 font-medium"
                    >
                        {truncate(torrent.title, 80)}
                    </Link>
                </div>

                <div className="flex items-center gap-4 text-sm mb-2">
                    <Badge variant="secondary" className="flex items-center gap-1">
                        <CalendarArrowUp className="size-4" />
                        <p>
                            {new Date(torrent.dateUploaded).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                            })}
                        </p>
                    </Badge>
                </div>

                <div className="flex items-center gap-1 mb-2">
                    <Badge variant="outline" className="flex items-center gap-1">
                        <ArrowsUpFromLine className="size-4" />
                        <p>Seeds: {torrent.seeders}</p>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                        <ArrowDownUp className="size-4" />
                        <p>Peers: {torrent.peers}</p>
                    </Badge>
                    <Badge variant="outline" className="flex items-center gap-1">
                        <HardDriveDownload className="size-4" />
                        <p>{formatBytes(String(torrent.size))}</p>
                    </Badge>
                </div>

                <p className="text-xs text-muted-foreground break-all">
                    Infohash: <span className="font-mono">{torrent.infohash}</span>
                </p>
            </div>

            <div className="flex items-center gap-2 mt-3">
                <MagnetLinkButton magnetLink={torrent.magnetLink} />
                {torrent.infohash && <DownloadWebtorButton infoHash={torrent.infohash} />}
                <Button onClick={handleDelete} variant="outline" size="sm">
                    <Trash className="size-4" />
                    <p>Remove</p>
                </Button>
            </div>
        </div>
    );
}