import { Button } from "@/components/ui/button/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useRetry } from "@/hooks/useRetry";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { RotateCw } from "lucide-react";
import type { FC } from "react";

export const ScanDialogError: FC<ErrorComponentProps> = ({ error, reset }) => {
  const { reset: resetQueries } = useQueryErrorResetBoundary();
  const { retry } = useRetry();

  const handleRetry = () => {
    resetQueries();
    reset();
    retry();
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <DialogHeader className="gap-4 pt-6 pr-12 pb-4 pl-6">
        <DialogTitle className="font-display text-3xl leading-none font-bold tracking-tighter uppercase">
          Scan failed
        </DialogTitle>
        {error instanceof Error && error.message && (
          <p className="border-l-2 border-destructive pl-3 font-mono text-sm wrap-break-word whitespace-pre-wrap text-destructive">
            {error.message}
          </p>
        )}
      </DialogHeader>
      <DialogFooter className="mx-0 mt-4 mb-0 rounded-none border-t-2 bg-transparent px-6 pt-4 pb-6">
        <DialogClose render={<Button variant="outline">Close</Button>} />
        <Button type="button" onClick={handleRetry}>
          <RotateCw />
          Try again
        </Button>
      </DialogFooter>
    </div>
  );
};
