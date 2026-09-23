import type { FocusEvent, MouseEvent } from "react";
export const selectOnFirstClick = (e: MouseEvent<HTMLInputElement>) => {
  if (document.activeElement === e.currentTarget) return;
  e.preventDefault();
  e.currentTarget.focus();
  e.currentTarget.select();
};

export const selectOnFocus = (e: FocusEvent<HTMLInputElement>) => {
  e.currentTarget.select();
};
