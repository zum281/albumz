import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChangeEventHandler, FC } from "react";
import { useState } from "react";
import { albumsQueryOptions, updateAlbumRating } from "../../../db/albums";
import type { Album } from "../../../types/album";
import { AlbumRatingSchema } from "../../../types/album";

export const AlbumLibraryRatingCell: FC<AlbumLibraryRatingCellProps> = ({
  id,
  album,
  rating,
}) => {
  const queryClient = useQueryClient();
  const { queryKey } = albumsQueryOptions();

  const [validationError, setValidationError] = useState<string | null>(null);

  const updateRatingMutation = useMutation({
    mutationFn: async (rating: number) => updateAlbumRating(id, rating),
    onMutate: (newRating) => {
      const previous = queryClient.getQueryData<Album[]>(queryKey);
      queryClient.setQueryData<Album[]>(queryKey, (old) =>
        old?.map((a) =>
          a.id === id ? { ...a, rating: newRating, listened: true } : a,
        ),
      );
      return { previous };
    },
    onError: (_err, _newRating, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
    },
  });

  const handleChange: ChangeEventHandler<HTMLSelectElement> = (e) => {
    const newRating = Number(e.target.value);
    const result = AlbumRatingSchema.safeParse(Number(e.target.value));
    if (!result.success) {
      setValidationError(result.error.issues[0].message);
      return;
    }
    setValidationError(null);
    updateRatingMutation.mutate(newRating);
  };

  return (
    <>
      <select
        aria-label={`${album}-rating`}
        defaultValue={rating ?? ""}
        onChange={handleChange}
        style={{
          display: "block",
          padding: "0.25rem 0.5rem",
          borderRadius: "var(--radius)",
          border: "1px solid var(--clr-border)",
          background: "var(--clr-surface)",
          color: "var(--clr-text)",
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          cursor: "pointer",
          margin: "auto",
        }}
      >
        {rating === null && (
          <option value="" disabled hidden>
            –
          </option>
        )}
        {[1, 2, 3, 4, 5].map((n) => (
          <option key={n} value={n}>
            {n}
          </option>
        ))}
      </select>
      {validationError && (
        <pre
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--clr-text-muted)",
            textAlign: "center",
          }}
        >
          {validationError}
        </pre>
      )}
    </>
  );
};

interface AlbumLibraryRatingCellProps {
  id: number;
  album: string;
  rating: number | null;
}
