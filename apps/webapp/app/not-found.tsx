import { Page } from "@/components/shared/page";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Page>
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">404 - Page Not Found</h1>
        <p>How'd you get here, nerd?</p>
        <Button className="max-w-30 mt-2">
          <Link href="/">Return Home</Link>
        </Button>
      </div>
    </Page>
  );
}
