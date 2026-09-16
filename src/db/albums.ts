import type { ExistingAlbum } from "../types/album";
import { getDb } from "./db";
import { sql } from "./sql";

export const getExistingAlbums = async (): Promise<ExistingAlbum[]> => {
  const db = await getDb();
  const rows = await db.select<ExistingAlbum[]>(sql`
      SELECT artist, album, track_count, ignored
      FROM albums
    `);

  return rows.map((r) => ({ ...r, ignored: Boolean(r.ignored) }));
};
