export const MAX_COLS = 256;

const F_MIN = 40;
const F_MAX = 16000;

/** Log-spaced `[from, to)` bin range per column, so bass doesn't get one column and treble the rest. */
export const columnBinRanges = (
  cols: number,
  binCount: number,
  sampleRate: number,
) => {
  const hzPerBin = sampleRate / 2 / binCount;
  const bin = (i: number) => (F_MIN * (F_MAX / F_MIN) ** (i / cols)) / hzPerBin;

  return Array.from({ length: cols }, (_, i) => {
    const from = Math.floor(bin(i));
    return [from, Math.max(Math.ceil(bin(i + 1)), from + 1)] as const;
  });
};
