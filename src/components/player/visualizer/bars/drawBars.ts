import { MAX_COLS } from "./geometry";

const PAD = 1.25;
const TOP = 3.625;
const BOTTOM_INSET = 1.375;
const BASELINE_OFFSET = 0.3125;
const BASELINE_THICKNESS = 0.0625;
const COL_GAP = 0.1875;
const DOT_WIDTH = 0.5;
const SEG = 0.375;
const SEG_GAP = 0.125;
const CAP_HEIGHT = 0.125;
const CAP_OFFSET = 0.625;

export type BarColors = {
  back: string;
  mid: string;
  front: string;
  cap: string;
  baseline: string;
};

const tier = (position: number, colors: BarColors) => {
  if (position < 0.45) return colors.back;
  if (position < 0.75) return colors.mid;
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
    if (peaks[i] > 0.02) {
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
