import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function DownloadWebtorButton({ infoHash }: { infoHash: string }) {

    return (
        <Link href={`https://webtor.io/${infoHash.toLowerCase()}`} target="_blank">
            <Button variant="outline" size="sm" className="flex items-center gap-2">
                <Download className="size-4" />
                <p>Download</p>
            </Button>
        </Link>
    );
}