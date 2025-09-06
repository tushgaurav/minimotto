import type { Metadata } from "next";
import { Page, PageTitle, Paragraph } from "@/components/shared/page";
import BookmarkItem from "./_components/BookmarkItem";
import { getTorrents } from "./action";
import { Torrent } from "@/types/core";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationPrevious,
    PaginationLink,
    PaginationNext,
    PaginationEllipsis,
} from "@/components/ui/pagination";

export const metadata: Metadata = {
    title: "Bookmarks | minimotto",
    description: "Bookmarks",
}

export default async function BookmarksPage({ searchParams }: { searchParams: Promise<Record<string, string | string[] | undefined>> }) {
    const perPage = 15;
    const { page: pageParam } = await searchParams;
    const page = Number(Array.isArray(pageParam) ? pageParam[0] : pageParam) || 1;
    const data = await getTorrents(perPage, page);

    return (
        <Page>
            <PageTitle>Bookmarks</PageTitle>
            <Paragraph>
                All torrents you have bookmarked on minimotto.
            </Paragraph>

            {"error" in (data as { error: string }) ? (
                <div className="text-sm text-destructive mt-6">{(data as { error: string }).error}</div>
            ) : (
                <>
                    {((data as { results: Torrent[] }).results.length > 0) ? (
                        <div className="flex flex-col gap-6 mt-4">
                            {(data as { results: Torrent[] }).results.map((torrent: Torrent) => (
                                <BookmarkItem key={torrent.infohash} torrent={torrent} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-sm text-muted-foreground mt-6">No bookmarks yet.</div>
                    )}

                    {((data as { total: number }).total > perPage) && (
                        <>
                            <div className="flex justify-between max-w-xl mt-10 mb-8">
                                <p className="text-sm text-muted-foreground">
                                    Page {(data as { page: number }).page} of {Math.ceil((data as { total: number }).total / perPage)} Showing {((data as { page: number }).page - 1) * perPage + 1}-{Math.min((data as { page: number }).page * perPage, (data as { total: number }).total)} of {(data as { total: number }).total} bookmarks
                                </p>
                            </div>

                            <Pagination className="max-w-xl m-0">
                                <PaginationContent>
                                    <PaginationItem>
                                        {((data as { page: number }).page > 1) && (
                                            <PaginationPrevious href={`/bookmarks?page=${(data as { page: number }).page - 1}`} className="text-xs text-muted-foreground" />
                                        )}
                                    </PaginationItem>
                                    <PaginationItem>
                                        <PaginationLink isActive>{(data as { page: number }).page}</PaginationLink>
                                    </PaginationItem>
                                    {((data as { page: number }).page + 1) <= Math.ceil((data as { total: number }).total / perPage) && (
                                        <PaginationItem>
                                            <PaginationLink href={`/bookmarks?page=${(data as { page: number }).page + 1}`}>{(data as { page: number }).page + 1}</PaginationLink>
                                        </PaginationItem>
                                    )}
                                    {((data as { page: number }).page + 2) <= Math.ceil((data as { total: number }).total / perPage) && (
                                        <PaginationItem>
                                            <PaginationLink href={`/bookmarks?page=${(data as { page: number }).page + 2}`}>{(data as { page: number }).page + 2}</PaginationLink>
                                        </PaginationItem>
                                    )}
                                    {((data as { page: number }).page + 2) < Math.ceil((data as { total: number }).total / perPage) && (
                                        <PaginationItem>
                                            <PaginationEllipsis />
                                        </PaginationItem>
                                    )}
                                    <PaginationItem>
                                        {((data as { page: number }).page < Math.ceil((data as { total: number }).total / perPage)) && (
                                            <PaginationNext className="text-xs" href={`/bookmarks?page=${(data as { page: number }).page + 1}`} />
                                        )}
                                    </PaginationItem>
                                </PaginationContent>
                            </Pagination>
                        </>
                    )}
                </>
            )}
        </Page>
    )
}