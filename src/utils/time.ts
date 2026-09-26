export const secondsToMinutes = (seconds: number): number => {
  return Math.round(seconds / 6) / 10;
};
export const secondsToHours = (seconds: number): number => {
  return Math.round(seconds / 360) / 10;
};
