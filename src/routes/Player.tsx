import { RouteHeader } from "@/components/route-header/RouteHeader";
import { RouteHeaderPlayer } from "@/components/route-header/RouteHeaderPlayer";
import type { FC } from "react";

export const Player: FC = () => {
  return (
    <main className="flex min-w-0 flex-1 flex-col pb-7">
      <RouteHeader title="Library" rightElement={<RouteHeaderPlayer />} />
      player
    </main>
  );
};
