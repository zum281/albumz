export const PAGE_SIZES = [10, 25, 50];

export const getPageWindow = (
  current: number,
  last: number,
): { page: number; gapBefore: boolean }[] => {
  const pages = [
    ...new Set([1, 2, current - 1, current, current + 1, last - 1, last]),
  ]
    .filter((page) => page >= 1 && page <= last)
    .sort((a, b) => a - b);

  return pages.map((page, i) => ({
    page,
    gapBefore: i > 0 && page - pages[i - 1] > 1,
  }));
};
