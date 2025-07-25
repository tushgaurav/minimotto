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
} from "@/components/ui/tooltip"
import DownloadWebtorButton from "./DownloadWebtorButton";

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
  }
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
                <p>{new Date(pubDate).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                })}
                </p>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>{pubDate}</p>
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
        <DownloadWebtorButton infoHash={attrs.infohash} />
      </div>
    </div>
  );
}

export function SearchResultCardsSkeleton() {
  return (
    <div className="flex flex-col gap-2 max-w-xl bg-[#111111]/50 rounded-lg p-4">
      <div className="flex flex-col gap-4">
        <div className="w-full h-8 bg-zinc-800 rounded-full animate-pulse" />
        <div className="w-full h-20 bg-zinc-800 rounded-md animate-pulse flex items-center justify-center"></div>
      </div>
    </div>
  );
}
