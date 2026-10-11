import type { ResolvedTheme } from "@/types/theme";
import { useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme"],
  });
  return () => {
    observer.disconnect();
  };
};

const getSnapshot = (): ResolvedTheme => {
  const value = document.documentElement.getAttribute("data-theme");
  return value === "dark" || value === "amoled" ? value : "light";
};

export const useResolvedTheme = () =>
  useSyncExternalStore(subscribe, getSnapshot);
