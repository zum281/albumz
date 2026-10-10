import { Button } from "@/components/ui/button/button";
import { useRetry } from "@/hooks/useRetry";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { CircleAlert, RotateCw } from "lucide-react";
import type { FC } from "react";

export const GraphError: FC<ErrorComponentProps> = ({ reset }) => {
  const { reset: resetQueries } = useQueryErrorResetBoundary();
  const { retry } = useRetry();

  const handleRetry = () => {
    resetQueries();
    reset();
    retry();
  };

  return (
    <div className="flex h-40 w-full flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-1 font-mono text-xs text-destructive uppercase">
        <CircleAlert size="14" />
        <p>Failed to load</p>
      </div>
      <Button variant="outline" size="sm" onClick={handleRetry}>
        <RotateCw />
        Try again
      </Button>
    </div>
  );
};
