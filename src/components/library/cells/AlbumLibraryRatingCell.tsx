import disc from "@/assets/ratings/glyph-rating-disc.svg";
import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
  updateAlbumRating,
} from "@/db/albums";
import type { Album } from "@/types/album";
import { Radio } from "@base-ui/react/radio";
import { RadioGroup } from "@base-ui/react/radio-group";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "cn";
import type { FC } from "react";
import { useState } from "react";

const RATINGS = [1, 2, 3, 4, 5] as const;

export const AlbumLibraryRatingCell: FC<AlbumLibraryRatingCellProps> = ({
  id,
  album,
  rating,
}) => {
  const queryClient = useQueryClient();
  const { queryKey: albumsQueryKey } = albumsQueryOptions();
  const { queryKey: listenedAlbumsCountQueryKey } =
    listenedAlbumsCountQueryOptions();

  const updateRatingMutation = useMutation({
    mutationFn: async (rating: number) => updateAlbumRating(id, rating),
    onMutate: (newRating) => {
      const previous = queryClient.getQueryData<Album[]>(albumsQueryKey);
      queryClient.setQueryData<Album[]>(albumsQueryKey, (old) =>
        old?.map((a) =>
          a.id === id ? { ...a, rating: newRating, listened: true } : a,
        ),
      );
      return { previous };
    },
    onSuccess: async () => {
      // Invalidating count since updating rating has the side effect
      // of updating listened column at db level
      await queryClient.invalidateQueries({
        queryKey: listenedAlbumsCountQueryKey,
      });
    },
    onError: (_err, _newRating, context) => {
      queryClient.setQueryData(albumsQueryKey, context?.previous);
    },
  });

  // Hover previews the rating the click would set
  const [hovered, setHovered] = useState<number | null>(null);
  const shown = hovered ?? rating;

  return (
    <RadioGroup
      aria-label={`Rating: ${album}`}
      value={rating}
      onValueChange={(value) => {
        if (value !== null) updateRatingMutation.mutate(value);
      }}
      onPointerLeave={() => {
        setHovered(null);
      }}
      className="flex items-center"
    >
      {RATINGS.map((n) => (
        <Radio.Root
          key={n}
          value={n}
          aria-label={`${n} ${n === 1 ? "disc" : "discs"}`}
          onPointerEnter={() => {
            setHovered(n);
          }}
          className={cn(
            "flex-none cursor-pointer p-0.5 focus-visible:outline-2 focus-visible:outline-ring",
            shown !== null && n <= shown ? "text-chart-4" : "text-border",
          )}
        >
          <span
            aria-hidden
            className="block size-4 bg-current mask-contain mask-center mask-no-repeat"
            style={{ maskImage: `url(${disc})` }}
          />
        </Radio.Root>
      ))}
    </RadioGroup>
  );
};

type AlbumLibraryRatingCellProps = {
  id: number;
  album: string;
  rating: number | null;
};
