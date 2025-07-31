"use client";

import { Input } from "@/components/ui/input";
import { ArrowRight, Mic, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { redirect } from "next/navigation";
import { useState } from "react";

export default function Search() {
  const [search, setSearch] = useState("");

  const handleSearch = () => {
    if (search.trim()) {
      redirect(`/search?q=${search}`);
    }
  };

  return (
    <div className="flex items-center gap-2 mx-auto w-full max-w-2xl">
      <div className="flex-1 flex items-center gap-2 bg-zinc-800 dark:bg-white rounded-full text-white dark:text-black group">
        <SearchIcon className="size-6 ml-4 group-hover:text-gray-500 transition-colors duration-300" />
        <Input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}
          className="max-w-xl p-4 h-12 border-none focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:ring-offset-transparent"
        />
        <Mic className="size-6 mr-4" />
      </div>
      <Button className="rounded-full h-12 w-12" onClick={handleSearch}>
        <ArrowRight className="size-6" />
      </Button>
    </div>
  );
}
