import { Button } from "@/components/ui/button/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { FC } from "react";

export const ScanDialogEmpty: FC<ScanDialogEmptyProps> = ({ source }) => {
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <DialogHeader className="gap-4 pt-6 pr-12 pb-4 pl-6">
        <DialogTitle className="font-display text-3xl leading-none font-bold tracking-tighter uppercase">
          No new albums
        </DialogTitle>
        <DialogDescription className="font-mono text-xs">
          Nothing new in {source}. Ignored albums only resurface when they gain
          tracks.
        </DialogDescription>
      </DialogHeader>
      <DialogFooter className="mx-0 mt-4 mb-0 rounded-none border-t-2 bg-transparent px-6 pt-4 pb-6">
        <DialogClose render={<Button>Close</Button>} />
      </DialogFooter>
    </div>
  );
};

type ScanDialogEmptyProps = { source: string };
