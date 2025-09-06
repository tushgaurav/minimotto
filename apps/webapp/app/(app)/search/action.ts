"use server";

import { db } from "@/db/drizzle";
import { savedTorrents } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";

type Torrent = {
  title: string;
  dateUploaded: string;
  size: number;
  seeders: number;
  peers: number;
  magnetLink: string;
  infohash: string;
  jackettindexer?: {
    id: string;
    name: string;
  };
};

export async function saveTorrent(
  torrent: Torrent,
  action: "save" | "delete" = "save"
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  try {
    if (action === "save") {
      await db.insert(savedTorrents).values({
        id: "IH-" + torrent.infohash,
        title: torrent.title,
        dateUploaded: new Date(torrent.dateUploaded),
        size: torrent.size,
        seeders: torrent.seeders,
        peers: torrent.peers,
        magnetLink: torrent.magnetLink,
        infohash: torrent.infohash,
        userId: session.user.id,
      });
    } else if (action === "delete") {
      await db
        .delete(savedTorrents)
        .where(eq(savedTorrents.id, "IH-" + torrent.infohash));
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to save torrent" };
  }

  return { success: true };
}
