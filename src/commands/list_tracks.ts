import type { Album } from "@/types/album";
import { TracksSchema } from "@/types/track";
import { queryOptions, skipToken } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export const listTracksQueryOptions = (album: Album | null) => {
  const path = album?.path;
  const artist = album?.artist;

  return queryOptions({
    queryKey: ["tracks", path, artist],
    queryFn:
      path && artist
        ? async () => {
            const res = await invoke("list_tracks", {
              albumPath: path,
              artist,
            });
            return TracksSchema.parse(res);
          }
        : skipToken,
  });
};
