import NavBar from "@/components/shared/nav-bar";
import Footer from "@/components/shared/footer";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import { siteContent } from "@/content/content";

export const metadata: Metadata = {
  title: siteContent.metadata.title,
  description: siteContent.metadata.description,
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
      <Toaster />
    </div>
  );
}
