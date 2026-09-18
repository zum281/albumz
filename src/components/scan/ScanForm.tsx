import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { FC } from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { albumsQueryOptions, upsertAlbum } from "@/db/albums";
import type { AlbumInsert } from "@/types/album";
import type { ScanFormValues, ScanResult } from "@/types/scan";
import { ScanFormSchema } from "@/types/scan";
import { secondsToMinutes } from "@/utils/time";
export const ScanForm: FC<ScanFormProps> = ({ scanResults }) => {
  const queryClient = useQueryClient();
  const { queryKey } = albumsQueryOptions();

  const [failed, setFailed] = useState<
    { album: AlbumInsert; reason: unknown }[]
  >([]);

  const { register, handleSubmit, control } = useForm<ScanFormValues>({
    resolver: zodResolver(ScanFormSchema),
    defaultValues: {
      albums: scanResults.map((r) => ({ ...r, accepted: true })),
    },
  });

  const { fields } = useFieldArray({ control, name: "albums" });

  const upsertMutation = useMutation({
    mutationFn: (albums: AlbumInsert[]) =>
      Promise.allSettled(albums.map(upsertAlbum)).then((results) =>
        results.map((r, i) => ({ result: r, album: albums[i] })),
      ),
    onSuccess: async (results) => {
      await queryClient.invalidateQueries({ queryKey });
      setFailed(
        results
          .filter((r) => r.result.status === "rejected")
          .map((r) => ({
            album: r.album,
            reason: (r.result as PromiseRejectedResult).reason as unknown,
          })),
      );
    },
  });

  const onSubmit = (data: ScanFormValues) => {
    const payload: AlbumInsert[] = data.albums.map((a) => ({
      artist: a.artist,
      album: a.album,
      year: a.year,
      duration_seconds: a.duration_seconds,
      track_count: a.track_count,
      ignored: !a.accepted,
      cover_path: a.cover_path,
    }));
    upsertMutation.mutate(payload);
  };

  return (
    <>
      <h2
        style={{
          margin: "0 0 1rem",
          fontFamily: "var(--font-display)",
          fontWeight: 500,
          fontSize: "1.25rem",
          letterSpacing: "var(--track-display)",
        }}
      >
        Found {scanResults.length} album{scanResults.length === 1 ? "" : "s"}
      </h2>

      {failed.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: "0 0 1rem",
            padding: "0.75rem 1rem",
            borderRadius: "var(--radius)",
            border: "1px solid var(--border)",
            background: "var(--card)",
            color: "var(--muted-foreground)",
            fontSize: "0.875rem",
          }}
        >
          {failed.map(({ album, reason }) => (
            <li key={`${album.artist}-${album.album}`}>
              {album.artist} - {album.album}: {String(reason)}
            </li>
          ))}
        </ul>
      )}
      <form
        id="scan-results-form"
        onSubmit={(e) => void handleSubmit(onSubmit)(e)}
      >
        {scanResults.length > 0 && (
          <ul
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "flex",
              flexDirection: "column",
              gap: "0.5rem",
              maxHeight: "50vh",
              overflowY: "auto",
            }}
          >
            {fields.map((field, index) => (
              <li
                key={field.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  padding: "0.5rem 0.75rem",
                  borderRadius: "var(--radius)",
                  border: "1px solid var(--border)",
                  background: "var(--card)",
                }}
              >
                <input
                  type="checkbox"
                  id={`accept-${field.id}`}
                  {...register(`albums.${index}.accepted`)}
                  style={{ width: "1.125rem", height: "1.125rem" }}
                />
                {field.cover_path ? (
                  <img
                    src={convertFileSrc(field.cover_path)}
                    alt={`${field.album} cover`}
                    width="48"
                    height="48"
                    style={{ borderRadius: "4px", flexShrink: 0 }}
                  />
                ) : (
                  <span
                    style={{
                      width: "48px",
                      height: "48px",
                      flexShrink: 0,
                      borderRadius: "4px",
                      background: "var(--background)",
                      border: "1px dashed var(--border)",
                    }}
                    aria-hidden="true"
                  />
                )}
                <label
                  htmlFor={`accept-${field.id}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.125rem",
                  }}
                >
                  <span style={{ fontSize: "0.9375rem" }}>
                    {field.artist} - {field.album}
                  </span>
                  <span
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {field.year} · {field.track_count} tracks
                    {field.duration_seconds > 0 &&
                      ` · ${secondsToMinutes(field.duration_seconds)} min`}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

interface ScanFormProps {
  scanResults: ScanResult[];
}
