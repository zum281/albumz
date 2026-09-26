export const cssvar = (name: string): string => {
  return getComputedStyle(document.documentElement).getPropertyValue(name);
};
