import { Button } from "@/components/ui/button/button";
import { Trash2 } from "lucide-react";
import type { FC } from "react";

export const DeleteAllData: FC = () => {
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
        Clears the local database. Your music files are not touched; a fresh
        scan will rebuild the library from them, without the ratings.
      </p>
      <Button
        type="button"
        variant="destructive-outline"
        className="self-start"
      >
        <Trash2 />
        Delete all data
      </Button>
    </section>
  );
};
