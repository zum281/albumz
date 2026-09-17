import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FC } from "react";
import { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { upsertAlbum } from "../../db/albums";
import type { AlbumInsert } from "../../types/album";
import type { ScanFormValues, ScanResult } from "../../types/scan";
import { ScanFormSchema } from "../../types/scan";
import { secondsToMinutes } from "../../utils/time";
export const ScanForm: FC<ScanFormProps> = ({ scanResults }) => {
  const queryClient = useQueryClient();

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
    onSuccess: (results) => {
      queryClient.invalidateQueries({ queryKey: ["albums"] });
      setFailed(
        results
          .filter((r) => r.result.status === "rejected")
          .map((r) => ({
            album: r.album,
            reason: (r.result as PromiseRejectedResult).reason,
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
    }));
    upsertMutation.mutate(payload);
  };

  return (
    <>
      {failed.length > 0 && (
        <ul>
          {failed.map(({ album, reason }) => (
            <li key={`${album.artist}-${album.album}`}>
              {album.artist} - {album.album}: {String(reason)}
            </li>
          ))}
        </ul>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {scanResults.length > 0 && (
          <ul>
            {fields.map((field, index) => (
              <li key={field.id}>
                <input
                  type="checkbox"
                  {...register(`albums.${index}.accepted`)}
                />
                {field.artist} - {field.album} - {field.track_count} songs,{" "}
                {field.year}
                {field.has_cover ? " Cover" : " Cover Missing"}
                {field.duration_seconds > 0 &&
                  `, duration ${secondsToMinutes(field.duration_seconds)}mins`}
              </li>
            ))}
          </ul>
        )}
        <button type="submit">Save</button>
      </form>
    </>
  );
};

type ScanFormProps = {
  scanResults: ScanResult[];
};
