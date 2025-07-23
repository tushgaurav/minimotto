import Search from "./_components/search";
import Doodle from "./_components/doodle";

export default function Home() {
  return (
    <div className="dark min-h-screen">
      <div className="mt-[23vh]">
        <Doodle />
        <Search />
      </div>
    </div>
  );
}
