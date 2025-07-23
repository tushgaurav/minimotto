import Link from "next/link";
import {
  HardDriveDownload,
  CalendarArrowUp,
  ArrowsUpFromLine,
  ArrowDownUp,
} from "lucide-react";
import MagnetLinkButton from "./MagenetLinkButton";

export type SearchResultCardsProps = {
  title: string;
  indexer: string;
  size: string;
  pubDate: string;
  description: string;
  magnetLink: string;
  seeders: number;
  peers: number;
};

export default function SearchResultCards({
  title,
  indexer,
  size,
  pubDate,
  description,
  magnetLink,
  seeders,
  peers,
}: SearchResultCardsProps) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="flex items-center gap-2">
          <Link
            href={magnetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-md mb-1 font-medium"
          >
            {title}
          </Link>
          <MagnetLinkButton magnetLink={magnetLink} />
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-2">
          <p>{indexer}</p>
          <div className="flex items-center gap-1">
            <ArrowsUpFromLine className="size-4" />
            <p> {seeders}</p>
          </div>
          <div className="flex items-center gap-1">
            <ArrowDownUp className="size-4" />
            <p> {peers}</p>
          </div>
          <div className="flex items-center gap-1">
            <HardDriveDownload className="size-4" />
            <p>{size}</p>
          </div>
          <div className="flex items-center gap-1">
            <CalendarArrowUp className="size-4" />
            <p>{new Date(pubDate).toLocaleDateString()}</p>
          </div>
        </div>
        <p
          className="max-w-[60ch] text-sm"
          dangerouslySetInnerHTML={{ __html: description }}
        ></p>
      </div>
    </div>
  );
}

export function SearchResultCardsSkeleton() {
  return (
    <div className="flex flex-col gap-2 max-w-xl">
      <div className="flex flex-col gap-4">
        <div className="w-full h-8 bg-zinc-800 rounded-full animate-pulse" />
        <div className="w-full h-20 bg-zinc-800 rounded-md animate-pulse flex items-center justify-center"></div>
      </div>
    </div>
  );
}
