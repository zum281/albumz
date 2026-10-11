import type { FC } from "react";
import { Boundaries } from "../Boundaries";
import { ErrorSmall } from "../errors/ErrorSmall";
import { ShelfList } from "./ShelfList";

export const Shelf: FC = () => {
  return (
    <section className="border border-border bg-card px-6 py-7">
      <h2 className="uppercase text-2xl font-bold tracking-tight">
        Random picks
      </h2>
      <Boundaries getResetKey={() => "shelf"} error={ErrorSmall}>
        <ShelfList />
      </Boundaries>
    </section>
  );
};
