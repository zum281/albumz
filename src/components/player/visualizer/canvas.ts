/**
 * Syncs the backing store to the CSS size and device pixel ratio, then returns
 * everything a draw function needs. `w`/`h` are CSS pixels, `rem` is the root
 * font size in them. Null while the canvas has no layout size.
 */
export const prepareCanvas = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  const w = canvas.clientWidth;
  const h = canvas.clientHeight;
  if (!w || !h) return null;

  const dpr = window.devicePixelRatio || 1;
  const width = Math.round(w * dpr);
  const height = Math.round(h * dpr);
  if (canvas.width !== width || canvas.height !== height) {
    canvas.width = width;
    canvas.height = height;
  }
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);
  const style = getComputedStyle(canvas);
  const readColor = (name: string) => style.getPropertyValue(name).trim();

  return { ctx, w, h, rem, readColor };
};
