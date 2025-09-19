import Link from "next/link";
import { siteContent } from "@/content/content";

export default function Footer() {
  return (
    <div className="mt-auto border-t-2 dark:border-accent border-secondary">
      <div className="flex px-6 py-4 items-center gap-4 max-w-screen-2xl mx-auto justify-between">
        <p className="text-sm text-muted-foreground p-4">
          © {new Date().getFullYear()} {siteContent.structuredData.name}.
        </p>
        <div className="flex gap-4 text-xs text-muted-foreground p-4">
          {siteContent.footer.links.map((link) => (
            <Link key={link.href} href={link.href}>{link.label}</Link>
          ))}
        </div>
      </div>
    </div>
  );
}
