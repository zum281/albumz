import { Checkbox } from "@/components/ui/checkbox";
import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
  updateAlbumListen,
} from "@/db/albums";
import type { Album } from "@/types/album";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FC } from "react";

export const AlbumLibraryListenedCell: FC<AlbumLibraryCellProps> = ({
  id,
  album,
  listened,
}) => {
  const queryClient = useQueryClient();
  const { queryKey: albumsQueryKey } = albumsQueryOptions();
  const { queryKey: listenedAlbumsCountQueryKey } =
    listenedAlbumsCountQueryOptions();

  const updateListenedMutation = useMutation({
    mutationFn: async (listened: boolean) => updateAlbumListen(id, listened),
    onMutate: (newListened) => {
      const previous = queryClient.getQueryData<Album[]>(albumsQueryKey);
      queryClient.setQueryData<Album[]>(albumsQueryKey, (old) =>
        old?.map((a) => (a.id === id ? { ...a, listened: newListened } : a)),
      );
      return { previous };
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: listenedAlbumsCountQueryKey,
      });
    },
    onError: (_err, _newListened, context) => {
      queryClient.setQueryData(albumsQueryKey, context?.previous);
    },
  });

  const handleCheckedChange = (checked: boolean) => {
    console.assert(
      checked === !listened,
      "checkbox checked out of sync with listened prop",
    );
    updateListenedMutation.mutate(!listened);
  };

  return (
    <Checkbox
      aria-label={`${album}-${listened ? "listened" : "not-listened"}`}
      onCheckedChange={handleCheckedChange}
      checked={listened}
    />
  );
};

interface AlbumLibraryCellProps {
  id: number;
  album: string;
  listened: boolean;
}
