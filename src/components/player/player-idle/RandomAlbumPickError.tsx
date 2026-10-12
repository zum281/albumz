import { Button } from "@/components/ui/button/button";
import { useRetry } from "@/hooks/useRetry";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { RotateCw, TriangleAlert } from "lucide-react";
import type { FC } from "react";

export const RandomAlbumPickError: FC<ErrorComponentProps> = ({
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
    <section className="flex flex-col gap-3 border border-border bg-card p-4">
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Random pick from backlog
        </h2>
        <Button variant="ghost" size="icon-sm" onClick={handleRetry}>
          <RotateCw />
        </Button>
      </div>
      <div className="flex items-center gap-2 font-mono text-xs tracking-widest text-destructive uppercase">
        <TriangleAlert className="size-4 flex-none" />
        <span>Couldn't pick an album</span>
      </div>
      {error instanceof Error && error.message && (
        <p className="border-l-2 border-destructive pl-3 font-mono text-xs wrap-break-word text-destructive">
          {error.message}
        </p>
      )}
    </section>
  );
};
