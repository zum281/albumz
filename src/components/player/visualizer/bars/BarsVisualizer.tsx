import {
  ATTACK,
  BAR_COLOR_VARS,
  MAX_COLS,
  PEAK_GRAVITY,
  RELEASE,
  SILENCE,
} from "@/constants/bars.visualizer";
import { analyser, audioCtx } from "@/context/player/audio";
import { usePlayer } from "@/hooks/usePlayer";
import { useSpectrum } from "@/hooks/useSpectrum";
import { PlayerStatus } from "@/types/enums";
import type { FC } from "react";
import { useCallback, useRef } from "react";
import { prepareCanvas } from "../canvas";
import { columnCount, drawBars } from "./drawBars";
import { columnBinRanges } from "./geometry";

export const BarsVisualizer: FC = () => {
  const { status } = usePlayer();
  const playing = status === PlayerStatus.PLAYING;

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const levelsRef = useRef(new Float32Array(MAX_COLS));
  const peaksRef = useRef(new Float32Array(MAX_COLS));
  const peakSpeedRef = useRef(new Float32Array(MAX_COLS));
  const rangesRef = useRef<{
    cols: number;
    ranges: ReturnType<typeof columnBinRanges>;
  } | null>(null);

  const onFrame = useCallback((bins: Uint8Array, dt: number) => {
    const canvas = canvasRef.current;
    const prepared = canvas && prepareCanvas(canvas);
    if (!prepared) return false;
    const { ctx, w, h, rem, readColor } = prepared;

    const cols = columnCount(w, rem);
    if (rangesRef.current?.cols !== cols) {
      rangesRef.current = {
        cols,
        ranges: columnBinRanges(
          cols,
          analyser.frequencyBinCount,
          audioCtx.sampleRate,
        ),
      };
    }
    const { ranges } = rangesRef.current;

    const levels = levelsRef.current;
    const peaks = peaksRef.current;
    const peakSpeed = peakSpeedRef.current;
    let animating = false;

    for (let c = 0; c < cols; c++) {
      const [from, to] = ranges[c];
      let value = 0;
      for (let b = from; b < to; b++) value = Math.max(value, bins[b]);
      const target = value / 255;

      const k = target > levels[c] ? ATTACK : RELEASE;
      levels[c] += (target - levels[c]) * Math.min(1, k * dt * 60);

      if (levels[c] >= peaks[c]) {
        peaks[c] = levels[c];
        peakSpeed[c] = 0;
      } else {
        peakSpeed[c] += dt * PEAK_GRAVITY;
        peaks[c] = Math.max(0, peaks[c] - peakSpeed[c] * dt);
      }
      if (levels[c] > SILENCE || peaks[c] > SILENCE) animating = true;
    }

    drawBars(ctx, w, h, rem, cols, levels, peaks, {
      back: readColor(BAR_COLOR_VARS.back),
      mid: readColor(BAR_COLOR_VARS.mid),
      front: readColor(BAR_COLOR_VARS.front),
      cap: readColor(BAR_COLOR_VARS.cap),
      baseline: readColor(BAR_COLOR_VARS.baseline),
    });

    return animating;
  }, []);

  useSpectrum(playing, onFrame);

  return (
    <div className="relative h-full overflow-hidden border border-border bg-card">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 block size-full"
      />
    </div>
  );
};
