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
import { openPath } from "@tauri-apps/plugin-opener";
import { Play } from "lucide-react";
import { Button } from "../ui/button/button";
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
    cell: (props) => (
      <span className="font-mono text-xs text-muted-foreground">
        {props.getValue<number | null>()}
      </span>
    ),
  },
  {
    accessorKey: "track_count",
    header: () => "Trk",
    cell: (props) => (
      <span className="font-mono text-xs text-muted-foreground">
        {props.getValue<number>()}
      </span>
    ),
  },
  {
    accessorKey: "duration_seconds",
    header: () => "Duration",
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
    id: "open",
    header: () => <span className="block text-center">Play</span>,
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
  },
];
