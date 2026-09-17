import type { QueryResult } from "@tauri-apps/plugin-sql";
import type { AlbumExisting, AlbumInsert } from "../types/album";
import { getDb } from "./db";
import { sql } from "./sql";

export const getExistingAlbums = async (): Promise<AlbumExisting[]> => {
  const db = await getDb();
  const query = sql`
      SELECT artist, album, track_count, ignored
      FROM albums
    `;
  const rows = await db.select<AlbumExisting[]>(query);

  return rows.map((r) => ({ ...r, ignored: Boolean(r.ignored) }));
};

export const upsertAlbum = async (album: AlbumInsert): Promise<QueryResult> => {
  const db = await getDb();
  const query = sql`
        INSERT INTO albums (artist, album, year, duration_seconds, track_count, ignored)
        VALUES ($1, $2, $3, $4, $5, $6)
        ON CONFLICT(artist, album) DO UPDATE SET
          year = excluded.year,
          duration_seconds = excluded.duration_seconds,
          ignored = excluded.ignored,
          track_count = excluded.track_count,
          updated_at = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'))
      `;
  return db.execute(query, [
    album.artist,
    album.album,
    album.year,
    album.duration_seconds,
    album.track_count,
    album.ignored,
  ]);
};
