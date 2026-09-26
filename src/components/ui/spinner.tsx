import { cn } from "cn";
import { Loader2Icon } from "lucide-react";
import type { ComponentProps, FC } from "react";

export const Spinner: FC<ComponentProps<"svg">> = ({ className, ...props }) => {
  return (
    <Loader2Icon
      data-slot="spinner"
      role="status"
      aria-label="Loading"
      className={cn("size-4 animate-spin", className)}
      {...props}
    />
  );
};
