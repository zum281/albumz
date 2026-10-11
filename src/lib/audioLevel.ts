export const DB_FLOOR = -60;
export const HOT_DB = -10;

export const peakToDb = (peak: number) => 20 * Math.log10(Math.max(peak, 1e-6));

/** Maps DB_FLOOR..0 dB onto 0..1. */
export const dbToLevel = (db: number) =>
  Math.min(1, Math.max(0, (db - DB_FLOOR) / -DB_FLOOR));

export const isHot = (db: number) => db > HOT_DB;
