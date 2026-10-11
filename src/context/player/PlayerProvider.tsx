import type { Album } from "@/types/album";
import { PlayerStatus } from "@/types/enums";
import { useNavigate } from "@tanstack/react-router";
import type { FC, PropsWithChildren } from "react";
import { useMemo, useState } from "react";
import { PlayerContext } from "./PlayerContext";
import type { PlayerContextType } from "./PlayerContext.types";

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const [album, setAlbum] = useState<Album | null>(null);
  const [status, setStatus] = useState<PlayerStatus>(PlayerStatus.IDLE);
  const [index, setIndex] = useState<number>(1);

  const playAlbum = async (album: Album) => {
    setAlbum(() => album);
    setStatus(PlayerStatus.PLAYING);
    await navigate({ to: "/player" });
  };

  const pause = () => {
    // TODO: actually pause player
    setStatus(PlayerStatus.PAUSED);
  };

  const resume = () => {
    // TODO: actually resume player
    setStatus(PlayerStatus.PLAYING);
  };

  const next = () => {
    // TODO: add check to never go above tracks.length
    setIndex((prev) => prev + 1);
  };
  const previous = () => {
    // TODO: add check to never go below 1
    setIndex((prev) => prev - 1);
  };

  const value: PlayerContextType = useMemo(
    () => ({ album, playAlbum, pause, resume, next, previous, index, status }),
    [album, status, index, playAlbum],
  );

  return <PlayerContext value={value}>{children}</PlayerContext>;
};

type PlayerProviderProps = PropsWithChildren;
