import type { Album } from "@/types/album";
import type { PlayerStatus } from "@/types/enums";
import type { Track } from "@/types/track";

export type PlayerContextType = {
  album: Album | null;
  tracks: Track[] | null;
  index: number;
  status: PlayerStatus;

  playAlbum: (album: Album) => void;
  pause: () => void;
  resume: () => void;
  stop: () => void;
  next: () => void;
  previous: () => void;
  mute: () => void;
  unmute: () => void;
  volume: number;
  changeVolume: (percent: number) => void;
  selectTrack: (index: number) => void;
};
