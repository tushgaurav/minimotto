"use client";

import { Magnet } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

type MagnetLinkButtonProps = {
  magnetLink: string;
};

export default function MagnetLinkButton({
  magnetLink,
}: MagnetLinkButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="link"
          className="p-0"
          onClick={() => {
            navigator.clipboard.writeText(magnetLink);
          }}
        >
          <Magnet className="size-4" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>Click to copy magnet link</p>
      </TooltipContent>
    </Tooltip>
  );
}
