import NavBar from "@/components/shared/nav-bar";
import Footer from "@/components/shared/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "minimotto.com",
  description: "Torrent search engine",
};

export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <NavBar />
      {children}
      <Footer />
    </div>
  );
}
