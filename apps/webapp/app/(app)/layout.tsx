import NavBar from "@/components/shared/nav-bar";
import Footer from "@/components/shared/footer";
import { Page } from "@/components/shared/page";
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
    <div>
      <NavBar />
      <Page>
        {children}
      </Page>
      <Footer />
    </div>
  );
}
