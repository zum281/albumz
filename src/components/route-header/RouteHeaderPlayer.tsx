import { usePlayer } from "@/hooks/usePlayer";
import type { FC } from "react";

export const RouteHeaderPlayer: FC = () => {
  const { album } = usePlayer();

  if (!album) return <p>nothing playing</p>;

  return (
    <p>
      {album.artist} - {album.album}
    </p>
  );
};
