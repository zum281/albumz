import { invoke } from "@tauri-apps/api/core";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { getExistingAlbums } from "./db/albums";
import { secondsToMinutes } from "./utils/time";
export const ScanResultsDemo: FC = () => {
  const [scanResult, setScanResult] = useState<ScanResult[] | null>(null);

  useEffect(() => {
    getExistingAlbums()
      .then((existing) => invoke<ScanResult[]>("scan_library", { existing }))
      .then((res) => setScanResult([...res]))
      .catch((e) => console.error(e));
  }, []);

  if (!scanResult) return null;

  return (
    <div>
      Total albums found: {scanResult.length}
      {scanResult.length > 0 && (
        <ul>
          {scanResult.map(
            ({
              artist,
              album,
              track_count,
              year,
              has_cover,
              duration_seconds,
            }) => (
              <li key={`${artist}-${album}`}>
                {artist} - {album} - {track_count} songs, {year},{" "}
                {has_cover ? "Cover" : "Cover Missing"}, duration{" "}
                {secondsToMinutes(duration_seconds)}mins
              </li>
            ),
          )}
        </ul>
      )}
    </div>
  );
};

type ScanResult = {
  artist: string;
  album: string;
  track_count: number;
  duration_seconds: number;
  year: number;
  has_cover: boolean;
};
