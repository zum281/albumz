export const secondsToMinutes = (seconds: number): number => {
  return Math.round(seconds / 6) / 10;
};

export const secondsToHours = (seconds: number): number => {
  return Math.round(seconds / 360) / 10;
};

export const formatClock = (seconds: number): string => {
  const total = Math.floor(seconds);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};
