/** Record radius. Most other sizes are fractions of it, in SVG viewBox units. */
export const R = 100;
export const VIEW_BOX = "-170 -170 340 340";

export const TICK_COUNT = 96;
export const TICK_INNER_RADIUS = R + 10;
export const TICK_BASE_LENGTH = 3;
export const TICK_MAX_EXTRA_LENGTH = R * 0.55;
export const TICK_STROKE_WIDTH = 3.6;

const GROOVE_INNER_RADIUS = R * 0.42;
const GROOVE_OUTER_RADIUS = R * 0.97;
const GROOVE_SPACING = 3.2;
export const GROOVE_STROKE_WIDTH = 0.9;
export const GROOVE_RADII = Array.from(
  {
    length:
      Math.floor((GROOVE_OUTER_RADIUS - GROOVE_INNER_RADIUS) / GROOVE_SPACING) +
      1,
  },
  (_, i) => GROOVE_INNER_RADIUS + i * GROOVE_SPACING,
);

/** Sheen arcs are drawn twice, at these start angles, so they sit opposite each other. */
export const SHEEN_ARC_ROTATIONS = [0, Math.PI];
export const SHEEN_ARCS = [
  { radius: R * 0.68, from: 0, to: 0.5 },
  { radius: R * 0.84, from: 0.15, to: 0.42 },
];
export const SHEEN_STROKE_WIDTH = 1.8;

export const LABEL_RADIUS = R * 0.36;
export const LABEL_LINES = [
  { x: -R * 0.2, y: -R * 0.12, width: R * 0.4, height: R * 0.035 },
  { x: -R * 0.13, y: R * 0.08, width: R * 0.26, height: R * 0.03 },
];
export const SPINDLE_RADIUS = 3.5;

export const RPM = 33.333;
