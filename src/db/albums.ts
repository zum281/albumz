import type { Album, AlbumInsert } from "@/types/album";
import { AlbumsSchema } from "@/types/album";
import { queryOptions } from "@tanstack/react-query";
import type { QueryResult } from "@tauri-apps/plugin-sql";
import { getDb } from "./db";
import { sql, toSqliteBool } from "./sql";

export const albumsQueryOptions = () => {
  return queryOptions({ queryKey: ["albums"], queryFn: getAlbums });
};
export const getAlbums = async (): Promise<Album[]> => {
  const db = await getDb();
  const query = sql`
      SELECT *
      FROM albums
      WHERE ignored = 0
      ORDER BY artist COLLATE NOCASE, album COLLATE NOCASE;
    `;
  const rows = await db.select(query);

  return AlbumsSchema.parse(rows);
};

export const listenedAlbumsCountQueryOptions = () => {
  return queryOptions({
    queryKey: ["albums", "listened", "count"],
    queryFn: getListenedAlbumsCount,
  });
};
export const getListenedAlbumsCount = async (): Promise<number> => {
  const db = await getDb();
  const query = sql`
    SELECT COUNT(*) AS count
    FROM albums
    WHERE listened = 1 AND ignored = 0;
  `;

  const rows = await db.select<{ count: number }[]>(query);
  return rows[0].count;
};

export const upsertAlbum = async (album: AlbumInsert): Promise<QueryResult> => {
  const db = await getDb();
  const query = sql`
        INSERT INTO albums (artist, album, year, duration_seconds, track_count, ignored, cover_path, path)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        ON CONFLICT(artist, album) DO UPDATE SET
          year = excluded.year,
          duration_seconds = excluded.duration_seconds,
          cover_path = excluded.cover_path,
          path = excluded.path,
          ignored = excluded.ignored,
          track_count = excluded.track_count,
          updated_at = (strftime('%Y-%m-%dT%H:%M:%fZ', 'now'));
      `;

  return db.execute(query, [
    album.artist,
    album.album,
    album.year,
    album.duration_seconds,
    album.track_count,
    toSqliteBool(album.ignored),
    album.cover_path,
    album.path,
  ]);
};

export const updateAlbumListen = async (
  id: Album["id"],
  listened: Album["listened"],
): Promise<QueryResult> => {
  const db = await getDb();
  const query = sql`
        UPDATE albums
        SET listened = $2
        WHERE id = $1;
      `;

  return db.execute(query, [id, toSqliteBool(listened)]);
};

export const updateAlbumRating = async (
  id: Album["id"],
  rating: Album["rating"],
): Promise<QueryResult> => {
  const db = await getDb();
  const query = sql`
        UPDATE albums
        SET rating = $2
        WHERE id = $1;
  `;

  return db.execute(query, [id, rating]);
};
