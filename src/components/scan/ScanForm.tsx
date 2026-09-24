import { Checkbox } from "@/components/ui/checkbox";
import { albumsQueryOptions, upsertAlbum } from "@/db/albums";
import type { AlbumInsert } from "@/types/album";
import type { ScanFormValues, ScanResult } from "@/types/scan";
import { secondsToMinutes } from "@/utils/time";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { FC } from "react";
import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { Controller, useFieldArray } from "react-hook-form";
export const ScanForm: FC<ScanFormProps> = ({ scanResults, form, source }) => {
  const queryClient = useQueryClient();
  const { queryKey } = albumsQueryOptions();

  const [failed, setFailed] = useState<
    { album: AlbumInsert; reason: unknown }[]
  >([]);

  const { handleSubmit, control } = form;

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
      {failed.length > 0 && (
        <ul className="mb-4 list-none border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
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
          <ul className="m-0 flex list-none flex-col gap-2 p-0">
            {fields.map((field, index) => (
              <li
                key={field.id}
                className="flex items-center gap-4 border border-border bg-card px-4 py-3"
              >
                <Controller
                  control={control}
                  name={`albums.${index}.accepted`}
                  render={({ field: { value, onChange } }) => (
                    <Checkbox
                      id={`accept-${field.id}`}
                      checked={value}
                      onCheckedChange={(checked) => {
                        onChange(checked);
                      }}
                    />
                  )}
                />
                {field.cover_path ? (
                  <img
                    src={convertFileSrc(field.cover_path)}
                    alt={`${field.album} cover`}
                    width="44"
                    height="44"
                    className="shrink-0"
                  />
                ) : (
                  <span
                    className="size-11 shrink-0 border border-dashed border-border bg-background"
                    aria-hidden="true"
                  />
                )}
                <label
                  htmlFor={`accept-${field.id}`}
                  className="flex min-w-0 flex-1 flex-col gap-1"
                >
                  <span className="truncate text-sm text-foreground">
                    {field.artist} - {field.album}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {field.year} · {field.track_count} tracks
                    {field.duration_seconds > 0 &&
                      ` · ${secondsToMinutes(field.duration_seconds)} min`}
                  </span>
                </label>
                <span
                  title={source}
                  className="font-mono text-xs whitespace-nowrap text-muted-foreground"
                >
                  {source}
                </span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </>
  );
};

type ScanFormProps = {
  scanResults: ScanResult[];
  form: UseFormReturn<ScanFormValues>;
  source: string;
};
