export const getPercentage = (total: number, partial: number) =>
  total === 0 ? 0 : (partial / total) * 100;
