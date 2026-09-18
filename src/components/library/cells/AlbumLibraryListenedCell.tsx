import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { ChangeEventHandler, FC } from "react";
import { albumsQueryOptions, updateAlbumListen } from "../../../db/albums";
import type { Album } from "../../../types/album";

export const AlbumLibraryListenedCell: FC<AlbumLibraryCellProps> = ({
  id,
  album,
  listened,
}) => {
  const queryClient = useQueryClient();
  const { queryKey } = albumsQueryOptions();
  const updateListenedMutation = useMutation({
    mutationFn: async (listened: boolean) => updateAlbumListen(id, listened),
    onMutate: (newListened) => {
      const previous = queryClient.getQueryData<Album[]>(queryKey);
      queryClient.setQueryData<Album[]>(queryKey, (old) =>
        old?.map((a) => (a.id === id ? { ...a, listened: newListened } : a)),
      );
      return { previous };
    },
    onError: (_err, _newListened, context) => {
      queryClient.setQueryData(queryKey, context?.previous);
    },
  });

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.assert(
      e.target.checked === !listened,
      "checkbox checked out of sync with listened prop",
    );
    updateListenedMutation.mutate(!listened);
  };

  return (
    <input
      type="checkbox"
      aria-label={`${album}-${listened ? "listened" : "not-listened"}`}
      onChange={handleChange}
      checked={listened}
      style={{
        display: "block",
        margin: "auto",
        width: "1.25rem",
        height: "1.25rem",
        cursor: "pointer",
        accentColor: "var(--clr-accent)",
      }}
    />
  );
};

interface AlbumLibraryCellProps {
  id: number;
  album: string;
  listened: boolean;
}
