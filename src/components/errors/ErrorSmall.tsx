import { CircleAlert } from "lucide-react";
import type { FC } from "react";

export const ErrorSmall: FC = () => {
  return (
    <div className="flex items-center flex-wrap gap-1 text-xs uppercase text-destructive font-mono mx-auto">
      <CircleAlert size="14" />
      <p className="leading-0">Something went wrong</p>
    </div>
  );
};
