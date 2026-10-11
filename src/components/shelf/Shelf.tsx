import { Button } from "@/components/ui/button/button";
import { getShelfAlbumsQueryOptions } from "@/db/albums";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import type { FC } from "react";
import { Boundaries } from "../Boundaries";
import { ErrorSmall } from "../errors/ErrorSmall";
import { ShelfList } from "./ShelfList";

export const Shelf: FC = () => {
  const queryClient = useQueryClient();

  const refreshPicks = async () => {
    await queryClient.invalidateQueries({
      queryKey: getShelfAlbumsQueryOptions().queryKey,
    });
  };

  return (
    <section className="border border-border bg-card px-6 py-7">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <h2 className="uppercase text-2xl font-bold tracking-tight">
          Random picks
        </h2>
        <Button
          variant="ghost"
          size="icon-sm"
          onClick={() => {
            void refreshPicks();
          }}
        >
          <RefreshCw />
        </Button>
      </div>
      <Boundaries getResetKey={() => "shelf"} error={ErrorSmall}>
        <ShelfList />
      </Boundaries>
    </section>
  );
};
