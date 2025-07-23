export function Page({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <main className={`p-4 px-8 w-full max-w-screen-xl mx-auto ${className}`}>
            {children}
        </main>
    )
}

export function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-4xl font-semibold mb-4">
            {children}
        </h1>
    )
}

export function Paragraph({ children }: { children: React.ReactNode }) {
    return (
        <p className="max-w-[80ch] py-2">
            {children}
        </p>
    )
}