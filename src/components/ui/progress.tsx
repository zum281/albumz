import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import { cn } from "cn";
import type { FC } from "react";

export const Progress: FC<ProgressPrimitive.Root.Props> = ({
  className,
  children,
  value,
  ...props
}) => {
  return (
    <ProgressPrimitive.Root
      value={value}
      data-slot="progress"
      className={cn("flex flex-wrap gap-3", className)}
      {...props}
    >
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive.Root>
  );
};

export const ProgressTrack: FC<ProgressPrimitive.Track.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Track
      className={cn(
        "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
        className,
      )}
      data-slot="progress-track"
      {...props}
    />
  );
};

export const ProgressIndicator: FC<ProgressPrimitive.Indicator.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Indicator
      data-slot="progress-indicator"
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  );
};

export const ProgressLabel: FC<ProgressPrimitive.Label.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Label
      className={cn("text-sm font-medium", className)}
      data-slot="progress-label"
      {...props}
    />
  );
};

export const ProgressValue: FC<ProgressPrimitive.Value.Props> = ({
  className,
  ...props
}) => {
  return (
    <ProgressPrimitive.Value
      className={cn(
        "ml-auto text-sm text-muted-foreground tabular-nums",
        className,
      )}
      data-slot="progress-value"
      {...props}
    />
  );
};
