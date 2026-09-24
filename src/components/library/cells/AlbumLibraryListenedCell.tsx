import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
  updateAlbumListen,
} from "@/db/albums";
import type { Album } from "@/types/album";
import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { cn } from "cn";
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

  return (
    <label
      className={cn(
        "flex cursor-pointer items-center gap-2 font-mono text-xs tracking-widest uppercase",
        listened ? "text-chart-2" : "text-muted-foreground",
      )}
    >
      <CheckboxPrimitive.Root
        checked={listened}
        onCheckedChange={(checked) => {
          updateListenedMutation.mutate(checked);
        }}
        className="block size-2 flex-none ring-1 ring-current ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring data-checked:bg-current"
      />
      <span aria-hidden>{listened ? "Played" : "Backlog"}</span>
      <span className="sr-only">Listened: {album}</span>
    </label>
  );
};

type AlbumLibraryCellProps = { id: number; album: string; listened: boolean };
