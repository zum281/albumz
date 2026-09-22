import { scanQueryOptions } from "@/commands/scan";
import { Button } from "@/components/ui/button/button";
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { albumsQueryOptions } from "@/db/albums";
import type { ScanFormValues, ScanResult } from "@/types/scan";
import { ScanFormSchema } from "@/types/scan";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { FolderIcon } from "lucide-react";
import type { FC } from "react";
import { useForm, useWatch } from "react-hook-form";
import { ScanForm } from "./ScanForm";

const SCAN_SOURCE = "~/Music/mp3";

export const ScanDialog: FC = () => {
  const { data: existingAlbums } = useQuery(albumsQueryOptions());
  const {
    data: scanResults,
    isLoading,
    isError,
    error,
  } = useQuery(scanQueryOptions(existingAlbums));

  if (scanResults) return <ScanDialogResults scanResults={scanResults} />;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <DialogHeader className="gap-4 pt-6 pr-12 pb-4 pl-6">
        <DialogTitle className="font-display text-3xl leading-none font-bold tracking-tighter uppercase">
          {isLoading ? "Scanning…" : "Scan failed"}
        </DialogTitle>
        {isError && (
          <pre className="font-mono text-sm whitespace-pre-wrap text-destructive">
            {String(error)}
          </pre>
        )}
      </DialogHeader>
      <DialogFooter className="mx-0 mt-4 mb-0 rounded-none border-t-2 bg-transparent px-6 pt-4 pb-6">
        <DialogClose render={<Button variant="outline">Close</Button>} />
      </DialogFooter>
    </div>
  );
};

const ScanDialogResults: FC<ScanDialogResultsProps> = ({ scanResults }) => {
  const form = useForm<ScanFormValues>({
    resolver: zodResolver(ScanFormSchema),
    defaultValues: {
      albums: scanResults.map((r) => ({ ...r, accepted: true })),
    },
  });

  const albums = useWatch({ control: form.control, name: "albums" });
  const acceptedCount = albums.filter((a) => a.accepted).length;

  const noneSelected = acceptedCount === 0;

  const toggleAll = () => {
    albums.forEach((_, i) => {
      form.setValue(`albums.${i}.accepted`, noneSelected, {
        shouldDirty: true,
        shouldValidate: true,
      });
    });
  };

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <DialogHeader className="gap-4 pt-6 pr-12 pb-4 pl-6">
        <div className="flex flex-wrap items-baseline justify-between gap-4">
          <DialogTitle className="font-display text-3xl leading-none font-bold tracking-tighter uppercase">
            Found {scanResults.length} new album
            {scanResults.length === 1 ? "" : "s"}
          </DialogTitle>
          <DialogDescription className="font-mono text-xs">
            {acceptedCount} SELECTED · 1 FOLDER
          </DialogDescription>
        </div>
        <div className="flex flex-wrap gap-2">
          <span className="flex items-center gap-2 border border-l-4 border-border border-l-chart-1 bg-card px-3 py-2 font-mono text-xs text-muted-foreground">
            <FolderIcon className="size-3.5 shrink-0" aria-hidden="true" />
            <span className="max-w-48 truncate">{SCAN_SOURCE}</span>
            <span>+{scanResults.length}</span>
          </span>
        </div>
      </DialogHeader>

      <div className="min-h-0 flex-1 overflow-y-auto px-6">
        <ScanForm scanResults={scanResults} form={form} source={SCAN_SOURCE} />
      </div>
      <DialogFooter className="mx-0 mt-4 mb-0 rounded-none border-t-2 bg-transparent px-6 pt-4 pb-6">
        <Button
          type="button"
          variant="link"
          className="px-0 sm:mr-auto"
          onClick={toggleAll}
        >
          {noneSelected ? "Select all" : "Deselect all"}
        </Button>
        <DialogClose render={<Button variant="outline">Close</Button>} />
        <Button type="submit" form="scan-results-form">
          Add {acceptedCount}
        </Button>
      </DialogFooter>
    </div>
  );
};

interface ScanDialogResultsProps {
  scanResults: ScanResult[];
}
