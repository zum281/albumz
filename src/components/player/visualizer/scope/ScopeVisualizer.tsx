import { SCOPE_COLOR_VARS } from "@/constants/scope.visualizer";
import { usePlayer } from "@/hooks/usePlayer";
import { useWaveform } from "@/hooks/useWaveform";
import { PlayerStatus } from "@/types/enums";
import type { FC } from "react";
import { useCallback, useRef } from "react";
import { prepareCanvas } from "../canvas";
import { drawScope, findTrigger } from "./drawScope";

export const ScopeVisualizer: FC = () => {
  const { status } = usePlayer();
  const playing = status === PlayerStatus.PLAYING;

  const canvasRef = useRef<HTMLCanvasElement>(null);

  const onFrame = useCallback((samples: Float32Array) => {
    const canvas = canvasRef.current;
    const prepared = canvas && prepareCanvas(canvas);
    if (!prepared) return;
    const { ctx, w, h, rem, readColor } = prepared;

    drawScope(ctx, w, h, rem, samples, findTrigger(samples), {
      trace: readColor(SCOPE_COLOR_VARS.trace),
      baseline: readColor(SCOPE_COLOR_VARS.baseline),
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
