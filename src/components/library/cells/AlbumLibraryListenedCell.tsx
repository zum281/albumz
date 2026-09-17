import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FC } from "react";
import { ChangeEventHandler } from "react";
import { updateAlbumListen } from "../../../db/albums";
import type { Album } from "../../../types/album";

export const AlbumLibraryListenedCell: FC<AlbumLibraryCellProps> = ({
  id,
  album,
  listened,
}) => {
  const queryClient = useQueryClient();
  const updateListenedMutation = useMutation({
    mutationFn: async (listened: boolean) => updateAlbumListen(id, listened),
    onMutate: async (newListened) => {
      const previous = queryClient.getQueryData<Album[]>(["albums"]);
      queryClient.setQueryData<Album[]>(["albums"], (old) =>
        old?.map((a) => (a.id === id ? { ...a, listened: newListened } : a)),
      );
      return { previous };
    },
    onError: (_err, _newListened, context) => {
      queryClient.setQueryData(["albums"], context?.previous);
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
      aria-label={`${album}-${listened}`}
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

type AlbumLibraryCellProps = {
  id: number;
  album: string;
  listened: boolean;
};
