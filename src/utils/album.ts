import type { Album, AlbumExisting } from "../types/album";

export const albumToExisting = (album: Album): AlbumExisting => {
  return {
    artist: album.artist,
    album: album.album,
    track_count: album.track_count,
  };
};
