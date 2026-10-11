import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAlbums } from "@/hooks/useAlbums";
import { useTable } from "@tanstack/react-table";
import { useTanStackTableDevtools } from "@tanstack/react-table-devtools";
import type { FC } from "react";
import {
  albumLibraryColumns,
  albumLibraryFeatures,
} from "./AlbumLibrary.config";
import { AlbumLibraryHeader } from "./AlbumLibraryHeader";
import { AlbumLibraryPagination } from "./AlbumLibraryPagination";

export const AlbumLibrary: FC = () => {
  const { filteredAlbums } = useAlbums();
  const table = useTable({
    key: "albums-table",
    columns: albumLibraryColumns,
    columnResizeMode: "onChange",
    data: filteredAlbums,
    features: albumLibraryFeatures,
    autoResetPageIndex: false,
    initialState: { sorting: [{ id: "artist", desc: false }] },
  });

  useTanStackTableDevtools(table);
  return (
    <section
      aria-label="Album library"
      className="border border-border bg-background"
    >
      <Table
        aria-label={`Album library, ${filteredAlbums.length} rows`}
        className="table-fixed"
        style={{ width: table.getTotalSize() }}
      >
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <AlbumLibraryHeader
                  key={header.id}
                  table={table}
                  header={header}
                />
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className="group hover:bg-card">
              {row.getAllCells().map((cell) => (
                <TableCell key={cell.id}>
                  <table.FlexRender cell={cell} />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <AlbumLibraryPagination table={table} />
    </section>
  );
};
