import type { Album } from "@/types/album";
import { TracksSchema } from "@/types/track";
import { queryOptions } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export const listTracksQueryOptions = (album: Album) =>
  queryOptions({
    queryKey: ["tracks", album.path, album.artist],
    queryFn: async () => {
      const res = await invoke("list_tracks", {
        albumPath: album.path,
        artist: album.artist,
      });
      return TracksSchema.parse(res);
    },
  });
