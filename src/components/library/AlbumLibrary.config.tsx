import type { ColumnDef } from "@tanstack/react-table";
import {
  columnResizingFeature,
  columnSizingFeature,
  tableFeatures,
} from "@tanstack/react-table";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { Album } from "../../types/album";
import { secondsToMinutes } from "../../utils/time";
import { CoverPlaceholder } from "../CoverPlaceholder";

export const albumLibraryFeatures = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
});

export const albumLibraryColumns: Array<
  ColumnDef<typeof albumLibraryFeatures, Album>
> = [
  {
    accessorKey: "cover_path",
    header: "Cover",
    cell: (props) => {
      const album = props.row.original;

      if (!album.cover_path) {
        return <CoverPlaceholder size={48} />;
      }

      return (
        <img
          src={convertFileSrc(album.cover_path)}
          alt={`${album.album} cover`}
          width="48"
          height="48"
        />
      );
    },
  },
  {
    accessorKey: "artist",
    header: "Artist",
    size: 300,
  },
  {
    accessorKey: "album",
    header: () => "Album",
    size: 300,
  },
  {
    accessorKey: "year",
    header: () => "Year",
  },
  {
    accessorKey: "track_count",
    header: () => "#tracks",
  },
  {
    accessorKey: "duration_seconds",
    header: () => "Duration (min)",
    cell: (props) => {
      const album = props.row.original;
      return <span>{secondsToMinutes(album.duration_seconds)}</span>;
    },
  },
  {
    accessorKey: "media_type",
    header: () => "Type",
  },
  {
    accessorKey: "rating",
    header: () => "Rating",
  },
  {
    accessorKey: "listened",
    header: () => "Listened?",
  },
  {
    accessorKey: "source",
    header: () => "Source",
  },
];
