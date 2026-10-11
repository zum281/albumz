import {
  BACK_TIER_END,
  BASELINE_OFFSET,
  BASELINE_THICKNESS,
  BOTTOM_INSET,
  CAP_HEIGHT,
  CAP_MIN_PEAK,
  CAP_OFFSET,
  COL_GAP,
  DOT_WIDTH,
  MAX_COLS,
  MID_TIER_END,
  PAD,
  SEG,
  SEG_GAP,
  TOP,
} from "@/constants/bars.visualizer";
import type { BarColors } from "@/types/bars.visualizer";

const tier = (position: number, colors: BarColors) => {
  if (position < BACK_TIER_END) return colors.back;
  if (position < MID_TIER_END) return colors.mid;
  return colors.front;
};

/** How many fixed-size columns fit across `w` CSS pixels. `rem` is the root font size in them. */
export const columnCount = (w: number, rem: number) =>
  Math.min(
    MAX_COLS,
    Math.max(
      1,
      Math.floor(
        (w - PAD * 2 * rem + COL_GAP * rem) / ((DOT_WIDTH + COL_GAP) * rem),
      ),
    ),
  );

/** Layout constants above are in rem; `w`/`h` are CSS pixels. `levels` and `peaks` are 0..1 per column. */
export const drawBars = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rem: number,
  cols: number,
  levels: ArrayLike<number>,
  peaks: ArrayLike<number>,
  colors: BarColors,
) => {
  ctx.clearRect(0, 0, w, h);
  const pad = PAD * rem;
  const dot = DOT_WIDTH * rem;
  const seg = SEG * rem;
  const segStep = (SEG + SEG_GAP) * rem;
  const pitch = (DOT_WIDTH + COL_GAP) * rem;
  const bottom = h - BOTTOM_INSET * rem;
  const avail = bottom - TOP * rem;
  const left = (w - (cols * pitch - COL_GAP * rem)) / 2;

  ctx.fillStyle = colors.baseline;
  ctx.fillRect(
    pad,
    bottom + BASELINE_OFFSET * rem,
    w - pad * 2,
    BASELINE_THICKNESS * rem,
  );

  for (let i = 0; i < cols; i++) {
    const x = left + i * pitch;
    const segments = Math.floor((levels[i] * avail) / segStep);
    for (let s = 0; s < segments; s++) {
      ctx.fillStyle = tier((s * segStep) / avail, colors);
      ctx.fillRect(x, bottom - (s + 1) * segStep + SEG_GAP * rem, dot, seg);
    }
    if (peaks[i] > CAP_MIN_PEAK) {
      ctx.fillStyle = colors.cap;
      ctx.fillRect(
        x,
        bottom - peaks[i] * avail - CAP_OFFSET * rem,
        dot,
        CAP_HEIGHT * rem,
      );
    }
  }
};
