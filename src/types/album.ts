import { z } from "zod";

export const AlbumSchema = z.object({
  id: z.number(),
  cover_path: z.string().nullable(),
  artist: z.string().min(1),
  album: z.string().min(1),
  year: z.number(),
  duration_seconds: z.number(),
  track_count: z.number(),
  listened: z.boolean(),
  rating: z.number().nullable(),
  ignored: z.boolean(),
});

export const AlbumsSchema = z.array(AlbumSchema);
export type Album = z.infer<typeof AlbumSchema>;
export type ExistingAlbum = Pick<
  Album,
  "album" | "artist" | "track_count" | "ignored"
>;
