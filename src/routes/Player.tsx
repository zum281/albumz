import { RouteHeader } from "@/components/route-header/RouteHeader";
import { RouteHeaderPlayer } from "@/components/route-header/RouteHeaderPlayer";
import { usePlayer } from "@/hooks/usePlayer";
import type { FC } from "react";

export const Player: FC = () => {
  const { album } = usePlayer();
  if (!album) return <div>idle</div>;

  return (
    <main className="flex min-w-0 flex-1 flex-col pb-7">
      <RouteHeader title="Library" rightElement={<RouteHeaderPlayer />} />
      You want to play {album.album} by {album.artist}
    </main>
  );
};
