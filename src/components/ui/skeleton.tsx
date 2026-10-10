import { cn } from "cn";
import type { ComponentProps, FC } from "react";

export const Skeleton: FC<ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="skeleton"
      aria-hidden
      className={cn("animate-pulse bg-muted", className)}
      {...props}
    />
  );
};
