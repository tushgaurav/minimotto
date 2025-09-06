"use server";

import { db } from "@/db/drizzle";
import { savedTorrents } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import { count, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { Torrent } from "@/types/core";


export async function getTorrents(
  numberOfResults: number = 10,
  page: number = 1
): Promise<{ error: string } | { results: Torrent[]; total: number; page: number }> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return { error: "Unauthorized" };
  }

  const rows = await db
    .select()
    .from(savedTorrents)
    .where(eq(savedTorrents.userId, session.user.id))
    .limit(numberOfResults)
    .offset((page - 1) * numberOfResults);

  const totalRows = await db
    .select({ value: count() })
    .from(savedTorrents)
    .where(eq(savedTorrents.userId, session.user.id));

  const torrents: Torrent[] = rows.map((r) => ({
    title: r.title,
    dateUploaded: r.dateUploaded,
    size: r.size,
    seeders: r.seeders,
    peers: r.peers,
    magnetLink: r.magnetLink,
    infohash: r.infohash,
  }));

  return { results: torrents, total: totalRows[0]?.value ?? 0, page };
}

export async function saveTorrent(
  torrent: Torrent,
  action: "save" | "delete" = "save"
): Promise<{ success: true } | { error: string }> {
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
