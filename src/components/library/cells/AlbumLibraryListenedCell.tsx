import { Checkbox } from "@/components/ui/checkbox";
import { albumsQueryOptions, updateAlbumListen } from "@/db/albums";
import type { Album } from "@/types/album";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { FC } from "react";

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
