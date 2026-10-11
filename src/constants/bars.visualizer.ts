export const MAX_COLS = 256;

export const F_MIN = 40;
export const F_MAX = 16000;

export const ATTACK = 0.55;
export const RELEASE = 0.14;
/** Peak caps hang, then accelerate: fall speed grows by this much per second. */
export const PEAK_GRAVITY = 0.5;
/** Below this a column counts as silent, which lets the frame loop stop. */
export const SILENCE = 0.001;

// Layout sizes are in rem.
export const PAD = 1.25;
export const TOP = 3.625;
export const BOTTOM_INSET = 1.375;
export const BASELINE_OFFSET = 0.3125;
export const BASELINE_THICKNESS = 0.0625;
export const COL_GAP = 0.1875;
export const DOT_WIDTH = 0.5;
export const SEG = 0.375;
export const SEG_GAP = 0.125;
export const CAP_HEIGHT = 0.125;
export const CAP_OFFSET = 0.625;
export const CAP_MIN_PEAK = 0.02;

export const BACK_TIER_END = 0.45;
export const MID_TIER_END = 0.75;

export const BAR_COLOR_VARS = {
  back: "--mark-back",
  mid: "--mark-mid",
  front: "--mark-front",
  cap: "--chart-4",
  baseline: "--border",
} as const;
