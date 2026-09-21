import type { Album, AlbumExisting } from "@/types/album";

export const albumToExisting = (album: Album): AlbumExisting => {
  return {
    artist: album.artist,
    album: album.album,
    track_count: album.track_count,
  };
};

export const getListenedAlbumsPercentage = (total: number, listened: number) =>
  total === 0 ? 0 : (listened / total) * 100;
