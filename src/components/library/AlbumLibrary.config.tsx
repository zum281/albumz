import type { Album } from "@/types/album";
import { secondsToMinutes } from "@/utils/time";
import type { ColumnDef } from "@tanstack/react-table";
import {
  columnResizingFeature,
  columnSizingFeature,
  createPaginatedRowModel,
  rowPaginationFeature,
  tableFeatures,
} from "@tanstack/react-table";
import { AlbumLibraryCoverCell } from "./cells/AlbumLibraryCoverCell";
import { AlbumLibraryListenedCell } from "./cells/AlbumLibraryListenedCell";
import { AlbumLibraryRatingCell } from "./cells/AlbumLibraryRatingCell";

export const albumLibraryFeatures = tableFeatures({
  columnSizingFeature,
  columnResizingFeature,
  rowPaginationFeature,
  paginatedRowModel: createPaginatedRowModel(),
});

export const albumLibraryColumns: ColumnDef<
  typeof albumLibraryFeatures,
  Album
>[] = [
  {
    accessorKey: "cover_path",
    header: () => <span className="sr-only">Cover</span>,
    size: 82,
    cell: (props) => <AlbumLibraryCoverCell album={props.row.original} />,
  },
  {
    accessorKey: "artist",
    header: "Artist",
    size: 220,
    cell: (props) => (
      <span className="block truncate">{props.getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "album",
    header: () => "Album",
    size: 340,
    cell: (props) => (
      <span className="block truncate">{props.getValue<string>()}</span>
    ),
  },
  {
    accessorKey: "year",
    header: () => "Year",
    size: 82,
    cell: (props) => (
      <span className="font-mono text-xs text-muted-foreground">
        {props.getValue<number | null>()}
      </span>
    ),
  },
  {
    accessorKey: "track_count",
    header: () => "Trk",
    size: 80,
    cell: (props) => (
      <span className="font-mono text-xs text-muted-foreground">
        {props.getValue<number>()}
      </span>
    ),
  },
  {
    accessorKey: "duration_seconds",
    header: () => "Duration",
    size: 98,
    cell: (props) => {
      const album = props.row.original;
      return (
        <span className="font-mono text-xs text-muted-foreground">
          {secondsToMinutes(album.duration_seconds)}
        </span>
      );
    },
  },
  {
    accessorKey: "media_type",
    header: () => "Type",
    size: 104,
    cell: (props) => {
      const type = props.getValue<string>();
      return (
        <span className="text-xs text-muted-foreground capitalize">{type}</span>
      );
    },
  },
  {
    accessorKey: "rating",
    header: () => "Rating",
    size: 116,
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
    header: () => "Status",
    size: 110,
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
    size: 110,
    cell: (props) => {
      const source = props.getValue<string>();
      return (
        <span className="text-xs text-muted-foreground capitalize">
          {source}
        </span>
      );
    },
  },
];
