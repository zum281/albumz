import type { Album } from "@/types/album";
import type { PlayerStatus } from "@/types/enums";

export type PlayerContextType = {
  album: Album | null;
  index: number;
  status: PlayerStatus;

  playAlbum: (album: Album) => void;
  pause: () => void;
  resume: () => void;
  next: () => void;
  previous: () => void;
};
