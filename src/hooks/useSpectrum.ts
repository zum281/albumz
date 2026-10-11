import { analyser } from "@/context/player/audio";
import { useEffect } from "react";

/**
 * Runs `onFrame` every animation frame while `playing`. After pause it keeps feeding
 * silence until `onFrame` returns false, so visuals can ease out instead of freezing.
 */
export const useSpectrum = (
  playing: boolean,
  onFrame: (bins: Uint8Array, dt: number) => boolean,
) => {
  useEffect(() => {
    const bins = new Uint8Array(analyser.frequencyBinCount);
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (playing) analyser.getByteFrequencyData(bins);
      else bins.fill(0);
      const animating = onFrame(bins, dt);
      if (playing || animating) frame = requestAnimationFrame(tick);
    };

    let frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [playing, onFrame]);
};
