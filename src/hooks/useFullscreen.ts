import { setKeepAwake } from "@/commands/keep_awake";
import { useCallback, useEffect, useState } from "react";
import { flushSync } from "react-dom";
export const useFullscreen = () => {
  const [fullscreen, setFullscreen] = useState(false);

  const toggleFullscreen = useCallback((next: boolean) => {
    const update = () => {
      // The transition snapshots the new state right after the callback returns,
      // DOM must be updated synchronously.
      // eslint-disable-next-line @eslint-react/dom-no-flush-sync
      flushSync(() => {
        setFullscreen(next);
      });
    };
    if ("startViewTransition" in document) {
      document.startViewTransition(update);
    } else {
      update();
    }
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
