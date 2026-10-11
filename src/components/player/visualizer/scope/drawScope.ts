const PAD = 1.25;
const LINE_WIDTH = 0.125;
const BASELINE_THICKNESS = 0.0625;

export type ScopeColors = { trace: string; baseline: string };

/** Index of the first rising zero crossing in the first half, so successive frames line up. */
export const findTrigger = (samples: ArrayLike<number>) => {
  const end = samples.length >> 1;
  for (let i = 1; i < end; i++) {
    if (samples[i - 1] < 0 && samples[i] >= 0) return i;
  }
  return 0;
};

/** Draws half of `samples` starting at `start`; `w`/`h` are CSS pixels, `rem` the root font size in them. */
export const drawScope = (
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  rem: number,
  samples: ArrayLike<number>,
  start: number,
  colors: ScopeColors,
) => {
  ctx.clearRect(0, 0, w, h);
  const pad = PAD * rem;
  const mid = h / 2;
  const amp = h / 2 - pad;
  const span = samples.length >> 1;

  ctx.fillStyle = colors.baseline;
  ctx.fillRect(pad, mid, w - pad * 2, BASELINE_THICKNESS * rem);

  ctx.strokeStyle = colors.trace;
  ctx.lineWidth = LINE_WIDTH * rem;
  ctx.lineJoin = "round";
  ctx.beginPath();
  for (let i = 0; i < span; i++) {
    const x = pad + (i / (span - 1)) * (w - pad * 2);
    const y = mid - Math.max(-1, Math.min(1, samples[start + i])) * amp;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.stroke();
};
