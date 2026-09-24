import {
  Table,
  TableBody,
  TableCell,
  TableHead,
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
import { AlbumLibraryPagination } from "./AlbumLibraryPagination";

export const AlbumLibrary: FC = () => {
  const { filteredAlbums } = useAlbums();
  const table = useTable({
    key: "albums-table",
    columns: albumLibraryColumns,
    data: filteredAlbums,
    features: albumLibraryFeatures,
    autoResetPageIndex: false,
  });

  useTanStackTableDevtools(table);
  return (
    <section
      aria-label="Album library"
      className="border border-border bg-background"
    >
      <Table aria-label={`Album library, ${filteredAlbums.length} rows`}>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  scope="col"
                  style={{ width: header.getSize() }}
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </TableHead>
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
