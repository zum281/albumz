import { scanQueryOptions } from "@/commands/scan";
import { Button } from "@/components/ui/button/button";
import type { AlbumExisting } from "@/types/album";
import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import { ScanForm } from "./ScanForm";

export const ScanDialog: FC<ScanDialogProps> = ({ existingAlbums }) => {
  const ref = useRef<HTMLDialogElement>(null);

  const {
    data: scanResults,
    isLoading,
    isError,
    error,
    dataUpdatedAt,
    refetch,
  } = useQuery(scanQueryOptions(existingAlbums));

  useEffect(() => {
    if (!scanResults) return;
    ref.current?.showModal();
  }, [scanResults, dataUpdatedAt]);

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
      {isLoading && (
        <p
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--muted-foreground)",
            margin: 0,
            fontSize: "0.8125rem",
          }}
        >
          Scanning… //TODO use progress bar
        </p>
      )}
      {isError && (
        <pre
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            color: "var(--muted-foreground)",
            whiteSpace: "pre-wrap",
            margin: 0,
          }}
        >
          {String(error)}
        </pre>
      )}

      <dialog
        ref={ref}
        style={{
          position: "fixed",
          inset: "0",
          margin: "auto",
          border: "1px solid var(--border)",
          borderRadius: "var(--radius)",
          background: "var(--background)",
          color: "var(--foreground)",
          fontFamily: "var(--font-sans)",
          padding: "1.5rem",
          width: "min(640px, 90vw)",
          maxHeight: "80vh",
        }}
      >
        {scanResults && <ScanForm scanResults={scanResults} />}
        {!scanResults && <p>Impossible state?</p>}
        <div
          style={{
            marginTop: "1rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
            gap: "0.75rem",
          }}
        >
          <Button onClick={() => ref.current?.close()}>Close</Button>
          <Button type="submit" form="scan-results-form">
            Save
          </Button>
        </div>
      </dialog>

      <Button onClick={() => void refetch()}>Scan</Button>
    </div>
  );
};

interface ScanDialogProps {
  existingAlbums: AlbumExisting[];
}
