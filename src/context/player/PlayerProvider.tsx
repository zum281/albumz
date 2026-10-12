import { listTracksQueryOptions } from "@/commands/list_tracks";
import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
  updateAlbumListen,
} from "@/db/albums";
import type { Album } from "@/types/album";
import { PlayerStatus } from "@/types/enums";
import type { Track } from "@/types/track";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { FC, PropsWithChildren } from "react";
import {
  startTransition,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { audio, gain } from "./audio";
import { PlayerContext } from "./PlayerContext";
import type { PlayerContextType } from "./PlayerContext.types";

export const PlayerProvider: FC<PlayerProviderProps> = ({ children }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [album, setAlbum] = useState<Album | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [status, setStatus] = useState<PlayerStatus>(PlayerStatus.IDLE);
  const [index, setIndex] = useState<number>(0);
  const [volume, setVolume] = useState(Math.round(gain.gain.value * 100));

  const requestRef = useRef(0);
  const lastVolumeRef = useRef(volume || 100);
  const { queryKey: albumsQueryKey } = albumsQueryOptions();
  const { queryKey: listenedCountQueryKey } = listenedAlbumsCountQueryOptions();

  const playAlbum = useCallback(
    async (album: Album) => {
      const request = ++requestRef.current;
      audio.pause();
      audio.currentTime = 0;
      startTransition(() => {
        setAlbum(album);
        setTracks(null);
        setStatus(PlayerStatus.LOADING);
      });
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

  const stop = useCallback(() => {
    requestRef.current++;
    audio.pause();
    audio.currentTime = 0;
    startTransition(() => {
      setAlbum(null);
      setTracks(null);
      setIndex(0);
      setStatus(PlayerStatus.IDLE);
    });
  }, []);

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

  const changeVolume = useCallback((percent: number) => {
    const next = Math.min(100, Math.max(0, percent));
    if (next > 0) lastVolumeRef.current = next;
    setVolume(next);
    gain.gain.value = next / 100;
  }, []);

  const mute = useCallback(() => {
    changeVolume(0);
  }, [changeVolume]);

  const unmute = useCallback(() => {
    changeVolume(lastVolumeRef.current);
  }, [changeVolume]);

  const { mutate: markListened } = useMutation({
    mutationFn: (id: Album["id"]) => updateAlbumListen(id, true),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: albumsQueryKey }),
        queryClient.invalidateQueries({ queryKey: listenedCountQueryKey }),
      ]);
    },
  });

  useEffect(() => {
    const onEnded = () => {
      if (tracks && index < tracks.length - 1) {
        void next();
        return;
      }
      if (album) markListened(album.id);
      stop();
    };
    audio.addEventListener("ended", onEnded);
    return () => {
      audio.removeEventListener("ended", onEnded);
    };
  }, [album, tracks, index, next, stop, markListened]);

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
      selectTrack: goTo,
      index,
      status,
      mute,
      unmute,
      changeVolume,
      volume,
    }),
    [
      album,
      tracks,
      status,
      index,
      playAlbum,
      stop,
      next,
      previous,
      mute,
      unmute,
      goTo,
      volume,
      changeVolume,
    ],
  );

  return <PlayerContext value={value}>{children}</PlayerContext>;
};

type PlayerProviderProps = PropsWithChildren;
