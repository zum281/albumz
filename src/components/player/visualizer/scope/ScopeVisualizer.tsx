import { usePlayer } from "@/hooks/usePlayer";
import { useWaveform } from "@/hooks/useWaveform";
import { PlayerStatus } from "@/types/enums";
import type { FC } from "react";
import { useCallback, useRef } from "react";
import { drawScope, findTrigger } from "./drawScope";

export const ScopeVisualizer: FC = () => {
  const { status } = usePlayer();
  const playing = status === PlayerStatus.PLAYING;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onFrame = useCallback((samples: Float32Array) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;

    const width = Math.round(w * dpr);
    const height = Math.round(h * dpr);
    if (canvas.width !== width || canvas.height !== height) {
      canvas.width = width;
      canvas.height = height;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
    const style = getComputedStyle(canvas);
    const read = (name: string) => style.getPropertyValue(name).trim();
    drawScope(ctx, w, h, rem, samples, findTrigger(samples), {
      trace: read("--chart-2"),
      baseline: read("--border"),
    });
  }, []);

  useWaveform(playing, onFrame);

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
