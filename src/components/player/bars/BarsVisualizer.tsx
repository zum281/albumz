import { analyser, audioCtx } from "@/context/player/audio";
import { usePlayer } from "@/hooks/usePlayer";
import { useSpectrum } from "@/hooks/useSpectrum";
import { PlayerStatus } from "@/types/enums";
import type { FC } from "react";
import { useCallback, useRef } from "react";
import { columnCount, drawBars } from "./drawBars";
import { MAX_COLS, columnBinRanges } from "./geometry";

const ATTACK = 0.55;
const RELEASE = 0.14;
/** Peak caps hang, then accelerate: fall speed grows by this much per second. */
const PEAK_GRAVITY = 0.5;

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
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return false;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return false;

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
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
      if (levels[c] > 0.001 || peaks[c] > 0.001) animating = true;
    }

    const width = Math.round(w * dpr);
    const height = Math.round(h * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const style = getComputedStyle(canvas);
    const read = (name: string) => style.getPropertyValue(name).trim();
    drawBars(ctx, w, h, rem, cols, levels, peaks, {
      back: read("--mark-back"),
      mid: read("--mark-mid"),
      front: read("--mark-front"),
      cap: read("--chart-4"),
      baseline: read("--border"),
    });

    return animating;
  }, []);

  useSpectrum(playing, onFrame);

  return (
    <div className="relative h-[clamp(15rem,44vh,27.5rem)] overflow-hidden border border-border bg-card">
      <canvas
        ref={canvasRef}
        aria-hidden
        className="absolute inset-0 block size-full"
      />
    </div>
  );
};
