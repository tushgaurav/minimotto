import {
  pgTable,
  text,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";

import { user } from "./core";
import { sql } from "drizzle-orm";

export const savedTorrents = pgTable("saved_torrents", {
  id: text("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  dateUploaded: timestamp("date_uploaded").notNull(),
  size: integer("size").notNull(),
  seeders: integer("seeders").notNull(),
  peers: integer("peers").notNull(),
  magnetLink: text("magnet_link").notNull(),
  infohash: text("infohash").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  createdAt: timestamp("created_at")
    .$defaultFn(() => /* @__PURE__ */ new Date())
    .notNull(),
  deleteAt: timestamp("delete_at"),
});
