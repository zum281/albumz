export type Album = {
  id: number;
  cover_path: string | null;
  artist: string;
  album: string;
  year: number;
  duration_seconds: number;
  track_count: number;
  listened: boolean;
  rating: number | null;
  ignored: boolean;
};

export type ExistingAlbum = Pick<
  Album,
  "album" | "artist" | "track_count" | "ignored"
>;
