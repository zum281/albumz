import { useQuery } from "@tanstack/react-query";
import type { FC } from "react";
import { useEffect, useRef } from "react";
import { scanQueryOptions } from "../../commands/scan";
import type { AlbumExisting } from "../../types/album";
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
            color: "var(--clr-text-muted)",
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
            color: "var(--clr-text-muted)",
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
          border: "1px solid var(--clr-border)",
          borderRadius: "var(--radius)",
          background: "var(--clr-bg)",
          color: "var(--clr-text)",
          fontFamily: "var(--font-body)",
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
          <button
            type="button"
            onClick={() => ref.current?.close()}
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--clr-border)",
              background: "var(--clr-surface)",
              color: "var(--clr-text)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            type="submit"
            form="scan-results-form"
            style={{
              padding: "0.5rem 1rem",
              borderRadius: "var(--radius)",
              border: "1px solid var(--clr-accent)",
              background: "var(--clr-accent)",
              color: "var(--clr-bg)",
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              cursor: "pointer",
            }}
          >
            Save
          </button>
        </div>
      </dialog>

      <button
        type="button"
        onClick={() => void refetch()}
        style={{
          padding: "0.5rem 1rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--clr-accent)",
          background: "var(--clr-accent)",
          color: "var(--clr-bg)",
          fontFamily: "var(--font-body)",
          fontSize: "0.75rem",
          cursor: "pointer",
        }}
      >
        Scan
      </button>
    </div>
  );
};

interface ScanDialogProps {
  existingAlbums: AlbumExisting[];
}
