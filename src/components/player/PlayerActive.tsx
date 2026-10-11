import { listTracksQueryOptions } from "@/commands/list_tracks";
import type { Album } from "@/types/album";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const PlayerActive: FC<PlayerActiveProps> = ({ album }) => {
  const { data: tracks } = useSuspenseQuery(listTracksQueryOptions(album));
  return (
    <div>
      You want to play {album.album} by {album.artist}
      Track list:
      <ul>
        {tracks.map((track) => (
          <li key={track.path}>
            {track.number} - {track.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

type PlayerActiveProps = { album: Album };
