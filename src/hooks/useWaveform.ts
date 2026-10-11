import { analyser } from "@/context/player/audio";
import { useEffect } from "react";

export const useWaveform = (
  playing: boolean,
  onFrame: (samples: Float32Array) => void,
) => {
  useEffect(() => {
    if (!playing) return;
    const samples = new Float32Array(analyser.fftSize);

    const tick = () => {
      analyser.getFloatTimeDomainData(samples);
      onFrame(samples);
      frame = requestAnimationFrame(tick);
    };

    let frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
    };
  }, [playing, onFrame]);
};
