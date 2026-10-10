import { Button } from "@/components/ui/button/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Spinner } from "@/components/ui/spinner";
import { deleteAllAlbums } from "@/db/albums";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { invoke } from "@tauri-apps/api/core";
import { Trash2 } from "lucide-react";
import type { FC } from "react";
import { useState } from "react";

export const DeleteAllData: FC = () => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: async () => {
      await deleteAllAlbums();
      await invoke("clear_covers");
    },
    onSuccess: async () => {
      setOpen(false);
      await queryClient.invalidateQueries();
    },
  });

  return (
    <section className="flex flex-col gap-4 border border-destructive bg-card px-6 py-7">
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="font-display text-3xl leading-none font-bold tracking-tighter text-destructive uppercase">
          Delete all data
        </h2>
        <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
          Cannot be undone
        </span>
      </div>
      <p className="max-w-prose text-sm text-muted-foreground">
        Clears the local database and cached covers. Your music files are not
        touched; a fresh scan will rebuild the library from them, without the
        ratings.
      </p>
      <Button
        type="button"
        variant="destructive-outline"
        className="self-start"
        onClick={() => {
          deleteMutation.reset();
          setOpen(true);
        }}
      >
        <Trash2 />
        Delete all data
      </Button>
      <Dialog
        open={open}
        onOpenChange={(next) => {
          if (!deleteMutation.isPending) setOpen(next);
        }}
      >
        <DialogContent showCloseButton={false}>
          <DialogHeader>
            <DialogTitle>Delete all data?</DialogTitle>
            <DialogDescription>
              Every album, rating and listened mark, plus all cached covers,
              will be permanently removed.
            </DialogDescription>
            {deleteMutation.isError && (
              <p className="text-sm text-destructive">
                {String(deleteMutation.error)}
              </p>
            )}
          </DialogHeader>
          <DialogFooter>
            <DialogClose
              render={<Button variant="outline">Cancel</Button>}
              disabled={deleteMutation.isPending}
            />
            <Button
              variant="destructive-outline"
              disabled={deleteMutation.isPending}
              onClick={() => {
                deleteMutation.mutate();
              }}
            >
              {deleteMutation.isPending ? <Spinner /> : <Trash2 />}
              Delete all data
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
};
