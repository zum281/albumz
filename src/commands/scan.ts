import type { AlbumExisting } from "@/types/album";
import { ScanResultSchema } from "@/types/scan";
import { queryOptions, skipToken } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";

export const scanQueryOptions = (existingAlbums?: AlbumExisting[]) =>
  queryOptions({
    queryKey: ["scan", existingAlbums],
    queryFn: existingAlbums
      ? async () => {
          const res = await invoke("scan_library", {
            existing: existingAlbums,
          });
          return ScanResultSchema.array().parse(res);
        }
      : skipToken,
  });
