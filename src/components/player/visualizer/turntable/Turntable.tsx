import { usePlayer } from "@/hooks/usePlayer";
import { PlayerStatus } from "@/types/enums";
import { cn } from "cn";
import type { FC, Ref } from "react";
import { R, TICK_COUNT, arcPath, tickLine } from "./geometry";

const GROOVE_RADII = Array.from(
  { length: Math.floor((R * 0.97 - R * 0.42) / 3.2) + 1 },
  (_, i) => R * 0.42 + i * 3.2,
);
const SHEEN_ARC_ROTATIONS = [0, Math.PI];
const RPM = 33.333;

export const Turntable: FC<TurntableProps> = ({ className, ticksRef }) => {
  const { status } = usePlayer();
  const spinning = status === PlayerStatus.PLAYING;
  return (
    <svg
      viewBox="-170 -170 340 340"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden
      className={className}
    >
      <g ref={ticksRef} className="stroke-chart-3" strokeWidth={3.6}>
        {Array.from({ length: TICK_COUNT }, (_, i) => (
          <line key={i} {...tickLine(i, 0)} />
        ))}
      </g>

      <circle r={R} className="fill-[#0D0F0C]" />

      <g className="stroke-[#F2EDE4]/6" fill="none" strokeWidth={0.9}>
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
        <g className="stroke-[#F2EDE4]/16" fill="none" strokeWidth={1.8}>
          {SHEEN_ARC_ROTATIONS.map((o) => (
            <g key={o}>
              <path d={arcPath(R * 0.68, o, o + 0.5)} />
              <path d={arcPath(R * 0.84, o + 0.15, o + 0.42)} />
            </g>
          ))}
        </g>
        <circle r={R * 0.36} className="fill-chart-3/40" />
        <g className="fill-black/50">
          <rect x={-R * 0.2} y={-R * 0.12} width={R * 0.4} height={R * 0.035} />
          <rect x={-R * 0.13} y={R * 0.08} width={R * 0.26} height={R * 0.03} />
        </g>
      </g>
      <circle r={3.5} className="fill-background" />
    </svg>
  );
};

type TurntableProps = {
  className: string;
  /** The `<g>` holding the tick `<line>`s, for per-frame updates outside React. */
  ticksRef?: Ref<SVGGElement>;
};
