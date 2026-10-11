import type { Album } from "@/types/album";
import { secondsToMinutes } from "@/utils/time";
import type { ColumnDef } from "@tanstack/react-table";
import {
  columnResizingFeature,
  columnSizingFeature,
  createPaginatedRowModel,
  createSortedRowModel,
  metaHelper,
  rowPaginationFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  sortFn_text,
  tableFeatures,
} from "@tanstack/react-table";
import { openPath } from "@tauri-apps/plugin-opener";
import { Play } from "lucide-react";
import { Button } from "../ui/button/button";
import { AlbumLibraryCoverCell } from "./cells/AlbumLibraryCoverCell";
import { AlbumLibraryListenedCell } from "./cells/AlbumLibraryListenedCell";
import { AlbumLibraryRatingCell } from "./cells/AlbumLibraryRatingCell";

type AlbumColumnMeta = { dataType?: "string" | "number"; align?: "center" };

export const albumLibraryFeatures = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
  rowPaginationFeature,
  rowSortingFeature,
  paginatedRowModel: createPaginatedRowModel(),
  sortedRowModel: createSortedRowModel(),
  columnMeta: metaHelper<AlbumColumnMeta>(),
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    text: sortFn_text,
    datetime: sortFn_datetime,
  },
});

export const albumLibraryColumns: ColumnDef<
  typeof albumLibraryFeatures,
  Album
>[] = [
  {
    accessorKey: "cover_path",
    enableResizing: false,
    enableSorting: false,
    size: 82,

    cell: (props) => <AlbumLibraryCoverCell album={props.row.original} />,
    header: () => <span className="sr-only">Cover</span>,
  },
  {
    accessorKey: "artist",
    header: "Artist",
    maxSize: 500,
    meta: { dataType: "string" },
    minSize: 120,
    size: 220,

    cell: (props) => (
      <span className="block truncate">{props.getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "album",
    maxSize: 500,
    meta: { dataType: "string" },
    minSize: 150,
    size: 340,

    cell: (props) => (
      <span className="block truncate">{props.getValue<string>()}</span>
    ),
    header: () => "Album",
  },
  {
    accessorKey: "year",
    maxSize: 160,
    meta: { dataType: "number", align: "center" },
    minSize: 100,
    size: 100,

    cell: (props) => (
      <span className="block text-center font-mono text-xs text-muted-foreground">
        {props.getValue<number | null>()}
      </span>
    ),
    header: () => "Year",
  },
  {
    accessorKey: "track_count",
    maxSize: 140,
    meta: { dataType: "number", align: "center" },
    minSize: 90,
    size: 90,

    cell: (props) => (
      <span className="block text-center font-mono text-xs text-muted-foreground">
        {props.getValue<number>()}
      </span>
    ),
    header: () => "Trk",
  },
  {
    accessorKey: "duration_seconds",
    maxSize: 220,
    meta: { dataType: "number", align: "center" },
    minSize: 140,
    size: 140,

    cell: (props) => {
      const album = props.row.original;
      return (
        <span className="block text-center font-mono text-xs text-muted-foreground">
          {secondsToMinutes(album.duration_seconds)}
        </span>
      );
    },
    header: () => "Duration",
  },
  {
    accessorKey: "media_type",
    maxSize: 180,
    meta: { dataType: "string", align: "center" },
    minSize: 100,
    size: 110,

    cell: (props) => {
      const type = props.getValue<string>();
      return (
        <span className="block text-center text-xs text-muted-foreground capitalize">
          {type}
        </span>
      );
    },
    header: () => "Type",
  },
  {
    accessorKey: "rating",
    maxSize: 220,
    meta: { dataType: "number", align: "center" },
    minSize: 130,
    size: 150,

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
    header: () => "Rating",
  },
  {
    accessorKey: "listened",
    maxSize: 200,
    meta: { dataType: "string", align: "center" },
    minSize: 120,
    size: 130,

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
    header: () => "Status",
  },
  {
    id: "open",
    enableResizing: false,
    enableSorting: false,
    meta: { align: "center" },
    size: 80,

    cell: (props) => {
      const albumPath = props.row.original.path;
      if (!albumPath) return null;
      return (
        <Button
          variant="outline"
          size="icon"
          className="block mx-auto"
          onClick={() => {
            void openPath(albumPath, "Music");
          }}
        >
          <Play className="size-3 fill-current text-muted-foreground" />
        </Button>
      );
    },
    header: () => <span className="block text-center">Play</span>,
  },
];
