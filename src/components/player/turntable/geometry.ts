export const R = 100;
export const TICK_COUNT = 96;
export const TICK_INNER_RADIUS = R + 10;
export const TICK_BASE_LENGTH = 3;
export const TICK_MAX_EXTRA_LENGTH = R * 0.55;

export const polar = (radius: number, angle: number) => ({
  x: Math.cos(angle) * radius,
  y: Math.sin(angle) * radius,
});

export const arcPath = (radius: number, from: number, to: number) => {
  const start = polar(radius, from);
  const end = polar(radius, to);
  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 0 1 ${end.x} ${end.y}`;
};

/** `level` is 0..1. Shared by the static render and the per-frame updater. */
export const tickLine = (index: number, level: number) => {
  const angle = -Math.PI / 2 + (index * Math.PI * 2) / TICK_COUNT;
  const from = polar(TICK_INNER_RADIUS, angle);
  const to = polar(
    TICK_INNER_RADIUS + TICK_BASE_LENGTH + level * TICK_MAX_EXTRA_LENGTH,
    angle,
  );
  return { x1: from.x, y1: from.y, x2: to.x, y2: to.y };
};
