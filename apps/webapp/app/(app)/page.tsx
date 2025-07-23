import Search from "./_components/search";
import Doodle from "./_components/doodle";
import { Page } from "@/components/shared/page";

export default function Home() {
  return (
    <Page className="flex flex-col items-center justify-center flex-grow w-full">
      <Doodle />
      <Search />
    </Page>
  );
}
