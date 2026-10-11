import { audio } from "@/context/player/audio";
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  audio.addEventListener("timeupdate", onChange);
  return () => {
    audio.removeEventListener("timeupdate", onChange);
  };
};

const getSnapshot = () => Math.floor(audio.currentTime);

export const useAudioTime = () => useSyncExternalStore(subscribe, getSnapshot);
