"use client";

import { Magnet } from "lucide-react";
import { toast } from "sonner"
import { Button } from "@/components/ui/button";

type MagnetLinkButtonProps = {
  magnetLink: string;
};

export default function MagnetLinkButton({
  magnetLink,
}: MagnetLinkButtonProps) {
  return (

    <Button
      variant="outline"
      size="sm"
      onClick={() => {
        navigator.clipboard.writeText(magnetLink);
        toast.success("Magnet link copied to clipboard.");
      }}
    >
      <Magnet className="size-4" />
      <p>Magnet Link</p>
    </Button>
  );
}
