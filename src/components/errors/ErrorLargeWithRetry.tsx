import { Button } from "@/components/ui/button/button";
import { useRetry } from "@/hooks/useRetry";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { RotateCw, TriangleAlert } from "lucide-react";
import type { FC } from "react";

export const ErrorLargeWithRetry: FC<ErrorComponentProps> = ({
  error,
  reset,
}) => {
  const { reset: resetQueries } = useQueryErrorResetBoundary();
  const { retry } = useRetry();

  const handleRetry = () => {
    resetQueries();
    reset();
    retry();
  };

  return (
    <div className="grid min-w-0 flex-1 place-items-center p-7">
      <div className="flex w-full max-w-md flex-col gap-6 border border-border bg-card p-6">
        <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-muted-foreground uppercase">
          <TriangleAlert className="size-4 text-destructive" />
          <span>Error</span>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="font-display text-2xl font-bold tracking-tight uppercase">
            Something went wrong
          </h2>
          {error instanceof Error && error.message && (
            <p className="border-l-2 border-destructive pl-3 font-mono text-xs wrap-break-word text-destructive">
              {error.message}
            </p>
          )}
        </div>

        <Button variant="outline" className="self-start" onClick={handleRetry}>
          <RotateCw />
          Try again
        </Button>
      </div>
    </div>
  );
};
