import { Button } from "@/components/ui/button/button";
import {
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Skeleton } from "@/components/ui/skeleton";
import type { FC } from "react";

const ROWS = 4;

export const ScanDialogSkeleton: FC = () => {
  return (
    <div
      role="status"
      aria-label="Scanning library"
      className="flex min-h-0 flex-1 flex-col"
    >
      <DialogHeader className="gap-4 pt-6 pr-12 pb-4 pl-6">
        <DialogTitle className="sr-only">Scanning…</DialogTitle>
        <Skeleton className="h-8 w-2/3" />
        <Skeleton className="h-8 w-48" />
      </DialogHeader>

      <ul className="m-0 flex min-h-0 flex-1 list-none flex-col gap-2 overflow-hidden px-6 p-0">
        {Array.from({ length: ROWS }, (_, i) => (
          <li
            key={i}
            className="flex items-center gap-4 border border-border bg-card px-4 py-3"
          >
            <Skeleton className="size-4 shrink-0" />
            <Skeleton className="size-11 shrink-0" />
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-3 w-1/3" />
            </div>
            <Skeleton className="h-3 w-24" />
          </li>
        ))}
      </ul>

      <DialogFooter className="mx-0 mt-4 mb-0 rounded-none border-t-2 bg-transparent px-6 pt-4 pb-6">
        <DialogClose render={<Button variant="outline">Close</Button>} />
      </DialogFooter>
    </div>
  );
};
