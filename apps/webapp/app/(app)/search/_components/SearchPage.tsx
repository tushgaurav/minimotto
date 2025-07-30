"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { ChevronDown, Search, Search as SearchIcon } from "lucide-react";
import { Mic } from "lucide-react";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import SearchResultCards, {
  SearchResultCardsProps,
  SearchResultCardsSkeleton,
} from "./SearchResultCards";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

function NoSearchResults({ searchQuery }: { searchQuery: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] px-4 py-8">
      <div className="mb-8">
        <div className="w-24 h-24 bg-zinc-800 rounded-full flex items-center justify-center shadow-lg">
          <Search className="w-12 h-12 text-zinc-300" />
        </div>
      </div>

      <div className="text-center max-w-lg space-y-6">
        <div>
          <h2 className="text-xl font-bold text-muted-foreground mb-3">No results found</h2>
          {searchQuery && (
            <p className="text-md text-muted-foreground">
              We couldn't find anything for <span className="font-medium text-muted-foreground">"{searchQuery}"</span>
            </p>
          )}
        </div>

        <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
          <h3 className="text-sm font-semibold text-foreground mb-4">Try these suggestions:</h3>
          <ul className="space-y-3 text-sm text-muted-foreground">
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span>Try different or more general keywords</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span>Check your spelling and try again</span>
            </li>
            <li className="flex items-center gap-3">
              <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
              <span>Use fewer search terms for broader results</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

type SortBy = "none" | "seeders_asc" | "seeders_desc" | "peers_asc" | "peers_desc" | "date_uploaded_asc" | "date_uploaded_desc" | "size_asc" | "size_desc";

export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<{
    page: number;
    results: SearchResultCardsProps[];
    total_results: number;
  }>({
    page: 1,
    results: [],
    total_results: 0,
  });
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "");
  const [sortBy, setSortBy] = useState<SortBy>("none");
  const router = useRouter();

  const sort = (searchResults: SearchResultCardsProps[], sortBy: SortBy) => {
    if (sortBy === "seeders_asc") {
      return searchResults.sort((a, b) => a.seeders - b.seeders);
    } else if (sortBy === "seeders_desc") {
      return searchResults.sort((a, b) => b.seeders - a.seeders);
    } else if (sortBy === "peers_asc") {
      return searchResults.sort((a, b) => a.peers - b.peers);
    } else if (sortBy === "peers_desc") {
      return searchResults.sort((a, b) => b.peers - a.peers);
    } else if (sortBy === "date_uploaded_asc") {
      return searchResults.sort((a, b) => a.date_uploaded - b.date_uploaded);
    } else if (sortBy === "date_uploaded_desc") {
      return searchResults.sort((a, b) => b.date_uploaded - a.date_uploaded);
    } else if (sortBy === "size_asc") {
      return searchResults.sort((a, b) => a.size - b.size);
    }
  };

  const sortResults = (sortBy: SortBy) => {
    setSortBy(sortBy);
    const sortedResults = sort(searchResults.results, sortBy);
    if (sortedResults) {
      setSearchResults({
        ...searchResults,
        results: sortedResults,
      });
    }
  };

  const search = async (query: string, page: number = 1) => {
    setLoading(true);
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}search/?q=${query}&page=${page}`
    );
    const data = await res.json();
    console.log({ data });
    setSearchResults({
      page: data.page,
      results: data.results,
      total_results: data.total_results,
    });
    setLoading(false);
  };

  useEffect(() => {
    search(searchParams.get("q")!, Number(searchParams.get("page")) || 1);
    document.title = `${searchParams.get("q")} | minimotto`;
  }, [searchParams]);

  return (
    <div className="">
      <div className="max-w-2xl flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full text-black group mb-10 mt-4 shadow-sm hover:shadow transition-all duration-300">
        <SearchIcon
          className="size-6 ml-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300"
          onClick={() => router.push(`/search?q=${searchTerm}`)}
        />
        <Input
          placeholder="Search movies, music, books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              router.push(`/search?q=${searchTerm}`);
            }
          }}
          className="w-full p-4 h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent placeholder:text-gray-400"
        />
        <button className="shrink-0 p-2 mr-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
          <Mic className="size-6 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      {/* Sorting */}
      <div className="flex justify-end items-center gap-4">
        {sortBy !== "none" && ( 
          <Badge className="p-2" variant="secondary" >
            {(() => {
              switch (sortBy) {
                case "size_asc":
                  return "Size Ascending";
                case "size_desc":
                  return "Size Descending";
                case "seeders_asc":
                  return "Seeders Ascending";
                case "seeders_desc":
                  return "Seeders Descending";
                case "peers_asc":
                  return "Peers Ascending";
                case "peers_desc":
                  return "Peers Descending";
                case "date_uploaded_asc":
                  return "Date Uploaded Ascending";
                case "date_uploaded_desc":
                  return "Date Uploaded Descending";
                default:
                  return "None";
              }
            })()}
          </Badge>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="outline" size="sm">
              Sort by <ChevronDown className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => sortResults("size_asc")}>Size (Asc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("size_desc")}>Size (Desc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("seeders_asc")}>Seeders (Asc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("seeders_desc")}>Seeders (Desc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("peers_asc")}>Peers (Asc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("peers_desc")}>Peers (Desc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("date_uploaded_asc")}>Date Uploaded (Asc)</DropdownMenuItem>
            <DropdownMenuItem onClick={() => sortResults("date_uploaded_desc")}>Date Uploaded (Desc)</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        {loading ? (
          <div className="flex flex-col gap-10">
            <SearchResultCardsSkeleton />
            <SearchResultCardsSkeleton />
            <SearchResultCardsSkeleton />
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {searchResults.results.map((result) => (
              <SearchResultCards key={result.title} {...result} />
            ))}
            {searchResults.results.length === 0 && (
              <NoSearchResults searchQuery={searchTerm} />
            )}
          </div>
        )}

        <div className="flex justify-between max-w-xl mt-10 mb-8">
          <p className="text-sm text-muted-foreground">
            Page {searchResults.page} of{" "}
            {Math.ceil(searchResults.total_results / 15)} Showing{" "}
            {searchResults.page * 15 - 15 + 1}-{searchResults.page * 15} of{" "}
            {searchResults.total_results} results
          </p>
          {/* <p className="text-sm text-muted-foreground">Sort by: Relevance</p> */}
        </div>

        {searchResults.total_results > 15 && (
          <Pagination className="max-w-xl m-0">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  className="text-xs text-muted-foreground"
                  onClick={() =>
                    router.push(
                      `/search?q=${searchTerm}&page=${searchResults.page - 1}`
                    )
                  }
                />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink isActive>{searchResults.page}</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    router.push(
                      `/search?q=${searchTerm}&page=${searchResults.page + 1}`
                    )
                  }
                >
                  {searchResults.page + 1}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink
                  onClick={() =>
                    router.push(
                      `/search?q=${searchTerm}&page=${searchResults.page + 2}`
                    )
                  }
                >
                  {searchResults.page + 2}
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext
                  className="text-xs"
                  onClick={() =>
                    router.push(
                      `/search?q=${searchTerm}&page=${searchResults.page + 1}`
                    )
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
