import { z } from "zod";
import { MediaType, Source } from "./enums";

const sqliteBool = z
  .number()
  .int()
  .min(0)
  .max(1)
  .transform((v) => v === 1);

export const AlbumSchema = z.object({
  id: z.number(),
  cover_path: z.string().nullable(),
  artist: z.string().min(1),
  album: z.string().min(1),
  year: z.number(),
  duration_seconds: z.number(),
  track_count: z.number(),
  listened: sqliteBool,
  rating: z.number().nullable(),
  ignored: sqliteBool,
  media_type: z.enum(MediaType),
  source: z.enum(Source),
  created_at: z.iso.datetime(),
  updated_at: z.iso.datetime(),
});

export const AlbumsSchema = z.array(AlbumSchema);
export type Album = z.infer<typeof AlbumSchema>;
export type AlbumExisting = Pick<
  Album,
  "album" | "artist" | "track_count" | "ignored"
>;

export type AlbumInsert = Pick<
  Album,
  "artist" | "album" | "year" | "duration_seconds" | "track_count" | "ignored"
>;
