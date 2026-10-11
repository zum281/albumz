import {
  GROOVE_RADII,
  GROOVE_STROKE_WIDTH,
  LABEL_LINES,
  LABEL_RADIUS,
  R,
  RPM,
  SHEEN_ARCS,
  SHEEN_ARC_ROTATIONS,
  SHEEN_STROKE_WIDTH,
  SPINDLE_RADIUS,
  TICK_COUNT,
  TICK_STROKE_WIDTH,
  VIEW_BOX,
} from "@/constants/turntable.visualizer";
import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { cn } from "cn";
import type { FC, Ref } from "react";
import { arcPath, tickLine } from "./geometry";

export const Turntable: FC<TurntableProps> = ({ className, ticksRef }) => {
  const { status } = usePlayer();
  const spinning = status === PlayerStatus.PLAYING;
  return (
    <svg
      viewBox={VIEW_BOX}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      className={className}
    >
      <g
        ref={ticksRef}
        className="stroke-chart-3"
        strokeWidth={TICK_STROKE_WIDTH}
      >
        {Array.from({ length: TICK_COUNT }, (_, i) => (
          <line key={i} {...tickLine(i, 0)} />
        ))}
      </g>

      <circle r={R} className="fill-vinyl" />

      <g
        className="stroke-vinyl-sheen/6"
        fill="none"
        strokeWidth={GROOVE_STROKE_WIDTH}
      >
        {GROOVE_RADII.map((radius) => (
          <circle key={radius} r={radius} />
        ))}
      </g>

      <g
        className={cn(
          "origin-top-left animate-spin motion-reduce:animate-none",
          !spinning && "paused",
        )}
        style={{ animationDuration: `${60 / RPM}s` }}
      >
        <g
          className="stroke-vinyl-sheen/16"
          fill="none"
          strokeWidth={SHEEN_STROKE_WIDTH}
        >
          {SHEEN_ARC_ROTATIONS.map((o) => (
            <g key={o}>
              {SHEEN_ARCS.map(({ radius, from, to }) => (
                <path key={radius} d={arcPath(radius, o + from, o + to)} />
              ))}
            </g>
          ))}
        </g>
        <circle r={LABEL_RADIUS} className="fill-chart-3/40" />
        <g className="fill-black/50">
          {LABEL_LINES.map((line) => (
            <rect key={line.y} {...line} />
          ))}
        </g>
      </g>
      <circle r={SPINDLE_RADIUS} className="fill-background" />
    </svg>
  );
};

type TurntableProps = {
  className: string;
  /** The `<g>` holding the tick `<line>`s, for per-frame updates outside React. */
  ticksRef?: Ref<SVGGElement>;
};
