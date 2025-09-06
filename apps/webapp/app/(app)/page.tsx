import Search from "./_components/search";
import Doodle from "./_components/doodle";
import { Page } from "@/components/shared/page";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "minimotto | Torrent Search Engine",
  description: "Torrent search engine",
};


export default function Home() {
  return (
    <Page className="flex flex-col items-center justify-center flex-grow w-full">
      <Doodle />
      <Search />
    </Page>
  );
}
