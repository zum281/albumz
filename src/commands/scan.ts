import { queryOptions } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { AlbumExisting } from "../types/album";
import { ScanResultSchema } from "../types/scan";

export const scanQueryOptions = (existingAlbums: AlbumExisting[]) =>
  queryOptions({
    queryKey: ["scan", existingAlbums],
    queryFn: async () => {
      const res = await invoke("scan_library", { existing: existingAlbums });
      return ScanResultSchema.array().parse(res);
    },
    enabled: false,
  });
