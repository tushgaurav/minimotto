"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bookmark, BookmarkCheck } from "lucide-react";

export default function BookmarkButton({
    handleSaveTorrent,
}: {
    handleSaveTorrent: () => void;
}) {
    const [isBookmarked, setIsBookmarked] = useState(false);

    return (
        <Button onClick={() => {
            handleSaveTorrent();
            setIsBookmarked(prev => !prev);
        }} variant="outline" size="sm">
            {isBookmarked ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
        </Button>
    )
}