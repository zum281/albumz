import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { FC } from "react";
import { ScanForm } from "./components/scan/ScanForm";
import { getExistingAlbums } from "./db/albums";
import { ScanResultSchema } from "./types/scan";
export const ScanResultsDemo: FC = () => {
  const {
    data: existingAlbums,
    isLoading: existingAlbumsLoading,
    isError: existingAlbumsError,
    error: existingAlbumsErrorObj,
  } = useQuery({
    queryKey: ["albums"],
    queryFn: getExistingAlbums,
  });

  const {
    data: scanResults,
    isLoading: scanResultsLoading,
    isError: scanResultsError,
    error: scanResultsErrorObj,
  } = useQuery({
    queryKey: ["scan"],
    queryFn: async () => {
      const res = await invoke("scan_library", { existing: existingAlbums });
      return ScanResultSchema.array().parse(res);
    },
    enabled: !!existingAlbums,
  });

  const isLoading = existingAlbumsLoading || scanResultsLoading;
  const isError = existingAlbumsError || scanResultsError;
  const error = existingAlbumsErrorObj ?? scanResultsErrorObj;

  if (isLoading) return <p>Loading…</p>;
  if (isError) return <pre>{String(error)}</pre>;
  if (!scanResults) return null;

  return (
    <div>
      Total albums found: {scanResults.length}
      <ScanForm scanResults={scanResults} />
    </div>
  );
};
