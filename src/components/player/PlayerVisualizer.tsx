import { usePlayer } from "@/hooks/usePlayer";
import { useWaveform } from "@/hooks/useWaveform";
import { dbToLevel, isHot, peakToDb } from "@/lib/audioLevel";
import { PlayerStatus } from "@/types/enums";
import type { FC } from "react";
import { useCallback, useRef } from "react";
import { Turntable } from "./turntable/Turntable";
import { TICK_COUNT, tickLine } from "./turntable/geometry";

export const PlayerVisualizer: FC = () => {
  const { status } = usePlayer();
  const playing = status === PlayerStatus.PLAYING;

  const ticksRef = useRef<SVGGElement>(null);

  const onFrame = useCallback((samples: Float32Array) => {
    const lines = ticksRef.current?.children;
    if (!lines) return;

    const slice = Math.floor(samples.length / TICK_COUNT);
    for (let i = 0; i < TICK_COUNT; i++) {
      let peak = 0;
      for (let j = 0; j < slice; j++) {
        peak = Math.max(peak, Math.abs(samples[i * slice + j]));
      }
      const db = peakToDb(peak);
      const { x2, y2 } = tickLine(i, dbToLevel(db));
      lines[i].setAttribute("x2", String(x2));
      lines[i].setAttribute("y2", String(y2));
      lines[i].classList.toggle("stroke-mark-front", isHot(db));
    }
  }, []);

  useWaveform(playing, onFrame);

  return (
    <div className="relative min-h-48 flex-1 overflow-hidden border border-border bg-card">
      <Turntable ticksRef={ticksRef} className="absolute inset-0 size-full" />
    </div>
  );
};
