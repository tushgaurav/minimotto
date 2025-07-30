export function Page({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <main className={`p-4 px-8 w-full max-w-screen-xl mx-auto mb-10 ${className}`}>
            {children}
        </main>
    )
}

export function PageTitle({ children }: { children: React.ReactNode }) {
    return (
        <h1 className="text-4xl mt-4 font-semibold mb-4">
            {children}
        </h1>
    )
}

export function Paragraph({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <p className={`max-w-[90ch] py-2 ${className}`}>
            {children}
        </p>
    )
}

export function Subtitle({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <h2 className={`text-2xl font-semibold mb-2 mt-6 ${className}`}>
            {children}
        </h2>
    )
}