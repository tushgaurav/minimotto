import type { Metadata } from "next";
import SearchResultsPage from "./_components/SearchPage";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: "Search | minimotto",
    description: "Search for a movie",
    icons: {
        icon: "/logo.svg",
    },
}

export default function ResultsPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <SearchResultsPage />
            </Suspense>
        </div>
    )
}