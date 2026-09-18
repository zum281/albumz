import type { ColumnDef } from "@tanstack/react-table";
import {
  columnResizingFeature,
  columnSizingFeature,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";
import { convertFileSrc } from "@tauri-apps/api/core";
import type { Album } from "../../types/album";
import { secondsToMinutes } from "../../utils/time";
import { CoverPlaceholder } from "../CoverPlaceholder";
import { AlbumLibraryListenedCell } from "./cells/AlbumLibraryListenedCell";
import { AlbumLibraryRatingCell } from "./cells/AlbumLibraryRatingCell";

export const albumLibraryFeatures = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
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
    cell: (props) => {
      const type = props.getValue<string>();
      return <span style={{ textTransform: "capitalize" }}>{type}</span>;
    },
  },
  {
    accessorKey: "rating",
    header: () => "Rating",
    cell: (props) => {
      const album = props.row.original;
      return (
        <AlbumLibraryRatingCell
          id={album.id}
          album={album.album}
          rating={album.rating}
        />
      );
    },
  },
  {
    accessorKey: "listened",
    header: () => "Listened?",
    cell: (props) => {
      const album = props.row.original;
      return (
        <AlbumLibraryListenedCell
          id={album.id}
          album={album.album}
          listened={album.listened}
        />
      );
    },
  },
  {
    accessorKey: "source",
    header: () => "Source",
    cell: (props) => {
      const source = props.getValue<string>();
      return <span style={{ textTransform: "capitalize" }}>{source}</span>;
    },
  },
];
