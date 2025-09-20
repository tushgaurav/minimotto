import { auth } from "@/lib/auth";
import { Page } from "@/components/shared/page";
import { headers } from "next/headers";
import MainPanel from "./_components/main";
import { User } from "better-auth";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "User Profile | minimotto",
  description: "User Profile",
  icons: {
    icon: "/logo.svg",
  },
};

export default async function UserProfilePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <Page>
      <MainPanel user={session?.user as unknown as User} />
    </Page>
  );
}
