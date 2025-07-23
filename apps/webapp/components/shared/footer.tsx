import Link from "next/link";

export default function Footer() {
    return (
        <div className="border-t mt-10">
            <div className="flex px-6 py-4 items-center gap-4 max-w-screen-2xl mx-auto justify-between">
                <p className="text-sm text-muted-foreground p-4">© {new Date().getFullYear()} minimotto.</p>
                <div className="flex gap-4 text-xs text-muted-foreground p-4">
                    <Link href="/privacy">Privacy</Link>
                    <Link href="/terms">Terms</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
        </div>
    )
}