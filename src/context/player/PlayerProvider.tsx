import { listTracksQueryOptions } from "@/commands/list_tracks";
import type { Album } from "@/types/album";
import { PlayerStatus } from "@/types/enums";
import type { Track } from "@/types/track";
import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { FC, PropsWithChildren } from "react";
import { useCallback, useMemo, useRef, useState } from "react";
import { audio } from "./audio";
import { PlayerContext } from "./PlayerContext";
import type { PlayerContextType } from "./PlayerContext.types";

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [status, setStatus] = useState<PlayerStatus>(PlayerStatus.IDLE);
  const [index, setIndex] = useState<number>(0);

  const requestRef = useRef(0);

  const playAlbum = useCallback(
    async (album: Album) => {
      const request = ++requestRef.current;
      audio.pause();
      audio.currentTime = 0;
      setAlbum(album);
      setTracks(null);
      setStatus(PlayerStatus.LOADING);
      void navigate({ to: "/player" });

      try {
        const loaded = await queryClient.query({
          ...listTracksQueryOptions(album),
          staleTime: "static",
        });
        if (request !== requestRef.current) return;
        audio.src = convertFileSrc(loaded[0].path);
        await audio.play();
        if (request !== requestRef.current) return;
        setTracks(loaded);
        setIndex(0);
        setStatus(PlayerStatus.PLAYING);
      } catch (error) {
        if (request !== requestRef.current) return;
        setStatus(PlayerStatus.IDLE);
        throw error;
      }
    },
    [navigate, queryClient],
  );

  const pause = () => {
    audio.pause();
    setStatus(PlayerStatus.PAUSED);
  };

  const resume = async () => {
    await audio.play();
    setStatus(PlayerStatus.PLAYING);
  };

  const stop = () => {
    requestRef.current++;
    audio.pause();
    audio.currentTime = 0;
    setAlbum(null);
    setTracks(null);
    setIndex(0);
    setStatus(PlayerStatus.IDLE);
  };

  const goTo = useCallback(
    async (target: number) => {
      if (!tracks || target < 0 || target >= tracks.length) return;
      audio.src = convertFileSrc(tracks[target].path);
      setIndex(target);
      await audio.play();
      setStatus(PlayerStatus.PLAYING);
    },
    [tracks],
  );

  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const previous = useCallback(() => goTo(index - 1), [goTo, index]);

  const value: PlayerContextType = useMemo(
    () => ({
      album,
      tracks,
      playAlbum,
      pause,
      resume,
      stop,
      next,
      previous,
      index,
      status,
    }),
    [album, tracks, status, index, playAlbum, next, previous],
  );

  return <PlayerContext value={value}>{children}</PlayerContext>;
};

type PlayerProviderProps = PropsWithChildren;
