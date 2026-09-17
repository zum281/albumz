import { useQuery } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import type { FC } from "react";
import { useEffect, useRef, useState } from "react";
import type { AlbumExisting } from "../../types/album";
import { ScanResultSchema } from "../../types/scan";
import { ScanForm } from "./ScanForm";

export const ScanDialog: FC<ScanDialogProps> = ({ existingAlbums }) => {
  const [launchScan, setLaunchScan] = useState<boolean>(false);
  const ref = useRef<HTMLDialogElement>(null);

  const {
    data: scanResults,
    isLoading,
    isError,
    error,
    dataUpdatedAt,
  } = useQuery({
    queryKey: ["scan"],
    queryFn: async () => {
      const res = await invoke("scan_library", { existing: existingAlbums });
      return ScanResultSchema.array().parse(res);
    },
    enabled: !!existingAlbums && launchScan,
  });

  const handleLaunchScan = () => {
    setLaunchScan(true);
  };

  useEffect(() => {
    if (!scanResults) return;
    setLaunchScan(false);
    ref.current?.showModal();
  }, [scanResults, dataUpdatedAt]);

  return (
    <>
      {isLoading && <p>progress bar</p>}
      {isError && <pre>{String(error)}</pre>}

      <dialog ref={ref}>
        {scanResults && <ScanForm scanResults={scanResults} />}
        {!scanResults && <p>Impossible state?</p>}
        <button onClick={() => ref.current?.close()}>Close</button>
      </dialog>

      <button onClick={handleLaunchScan}>Scan</button>
    </>
  );
};

type ScanDialogProps = {
  existingAlbums: AlbumExisting[];
};
