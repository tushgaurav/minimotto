"use client";

import { useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Search as SearchIcon } from "lucide-react";
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
} from "@/components/ui/pagination"
import SearchResultCards, { SearchResultCardsProps, SearchResultCardsSkeleton } from "./SearchResultCards";


export default function SearchResultsPage() {
  const searchParams = useSearchParams();
  const [searchResults, setSearchResults] = useState<SearchResultCardsProps[]>([]);
  const [query, setQuery] = useState(searchParams.get("q") || "");

  useEffect(() => {
    console.log(query);
    fetch(`http://localhost:8000/search/?q=${query}`).then(res => res.json()).then(data => {
      console.log(data);
      setSearchResults(data);
    });
  }, [query]);

  return (
    <div className="">
      <div className="max-w-2xl flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-full text-black group mb-10 mt-4 shadow-sm hover:shadow transition-all duration-300">
        <SearchIcon className="size-6 ml-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
        <Input
          placeholder="Search movies, music, books..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full p-4 h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent placeholder:text-gray-400"
        />
        <button className="shrink-0 p-2 mr-2 hover:bg-gray-100 rounded-full transition-colors duration-300">
          <Mic className="size-6 text-gray-400 hover:text-gray-600" />
        </button>
      </div>

      <div className="flex flex-col gap-8 mt-4">
        {searchResults.length > 0 ? (
          searchResults.map((result) => (
            <SearchResultCards key={result.title} {...result} />
          ))
        ) : (
          <div className="flex flex-col gap-10">
          <SearchResultCardsSkeleton />
          <SearchResultCardsSkeleton />
          <SearchResultCardsSkeleton />
          <SearchResultCardsSkeleton />
          </div>
        )}

        <div className="flex justify-between max-w-xl mt-10 mb-8">
          <p className="text-sm text-muted-foreground">Showing 1-10 of 100 results</p>
          {/* <p className="text-sm text-muted-foreground">Sort by: Relevance</p> */}
        </div>

        <Pagination className="max-w-xl m-0">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious className="text-xs text-muted-foreground" href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" >
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext className="text-xs" href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>

      </div>
    </div>
  );
}
