import { setKeepAwake } from "@/commands/keep_awake";
import { startTransition, useCallback, useEffect, useState } from "react";
export const useFullscreen = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback((next: boolean) => {
    startTransition(() => {
      setFullscreen(next);
    });
  }, []);

  useEffect(() => {
    if (!fullscreen) return;
    void setKeepAwake(true);
    return () => {
      void setKeepAwake(false);
    };
  }, [fullscreen]);

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") toggleFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen, toggleFullscreen]);

  return { fullscreen, toggleFullscreen };
};
