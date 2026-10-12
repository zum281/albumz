import { PlayerStatus } from "@/types/enums";
import { useHotkey } from "@tanstack/react-hotkeys";
import { usePlayer } from "./usePlayer";

const SELF_HANDLING = "button, a[href], summary, [role]";

export const usePlayerHotkeys = () => {
  const { status, pause, resume, stop, next, previous, mute, unmute, volume } =
    usePlayer();

  const muted = volume === 0;

  const handlePressSpace = (e: KeyboardEvent) => {
    if (e.target instanceof Element && e.target.matches(SELF_HANDLING)) return;
    e.preventDefault();
    if (status === PlayerStatus.PLAYING) pause();
    else if (status === PlayerStatus.PAUSED) resume();
  };

  const handleMuteUnmute = () => {
    if (muted) unmute();
    else mute();
  };

  useHotkey("Space", handlePressSpace, {
    preventDefault: false,
    requireReset: true,
  });

  useHotkey("Shift+N", next);
  useHotkey("Shift+P", previous);
  useHotkey("Shift+S", stop);
  useHotkey("Shift+M", handleMuteUnmute);
};
