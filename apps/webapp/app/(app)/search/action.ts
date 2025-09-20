"use server";

import { db } from "@/db/drizzle";
import { savedTorrents, userStats } from "@/db/schema/schema";
import { auth } from "@/lib/auth";
import { eq, sql } from "drizzle-orm";
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
      await db.transaction(async (tx) => {
        await tx.insert(savedTorrents).values({
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

        await tx.insert(userStats).values({
          userId: session.user.id,
          totalBookmarks: sql`total_bookmarks + 1`,
        }).onConflictDoUpdate({
          target: [userStats.userId],
          set: {
            totalBookmarks: sql`total_bookmarks + 1`,
          },
        });

      })
    } else if (action === "delete") {
      await db.transaction(async (tx) => {
        await tx.delete(savedTorrents).where(eq(savedTorrents.id, "IH-" + torrent.infohash));

        await tx.update(userStats).set({
          totalBookmarks: sql`total_bookmarks - 1`,
        }).where(eq(userStats.userId, session.user.id));
      });
    }
  } catch (error) {
    console.error(error);
    return { error: "Failed to save torrent" };
  }

  return { success: true };
}

export async function search(query: string, page: number = 1) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}search/?q=${query}&page=${page}`
  );
  const data = await res.json();

  // update user stats
  if (session) {
    await db.insert(userStats).values({
      userId: session.user.id,
      totalSearches: sql`total_searches + 1`,
    }).onConflictDoUpdate({
      target: [userStats.userId],
      set: {
        totalSearches: sql`total_searches + 1`,
      },
    });
  }

  return data;
}