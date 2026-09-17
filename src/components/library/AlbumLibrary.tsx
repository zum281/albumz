import type { FC } from "react";
import type { Album } from "../../types/album";
import { secondsToMinutes } from "../../utils/time";

export const AlbumLibrary: FC<AlbumLibraryProps> = ({ albums }) => {
  return (
    <section>
      <p>Total albums: {albums.length}</p>
      <br />
      <ul style={{ listStyleType: "none" }}>
        {albums.map((album) => (
          <li
            key={album.id}
            style={{
              paddingBlock: "0.5rem",
              borderBottom: "1px solid var(--clr-border)",
            }}
          >
            {album.artist} | {album.album} | {album.track_count} songs |{" "}
            {secondsToMinutes(album.duration_seconds)}mins | {album.media_type}{" "}
            | {album.source} | {album.year} |{" "}
            {album.listened ? "Listened" : "Not Listened"}
          </li>
        ))}
      </ul>
    </section>
  );
};

type AlbumLibraryProps = {
  albums: Album[];
};
