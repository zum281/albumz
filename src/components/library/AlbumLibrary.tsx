import type { Album } from "@/types/album";
import type { FC } from "react";

import { useTable } from "@tanstack/react-table";
import { useTanStackTableDevtools } from "@tanstack/react-table-devtools";
import {
  albumLibraryColumns,
  albumLibraryFeatures,
} from "./AlbumLibrary.config";
import { AlbumLibraryPagination } from "./AlbumLibraryPagination";

export const AlbumLibrary: FC<AlbumLibraryProps> = ({ albums }) => {
  const table = useTable({
    key: "albums-table",
    columns: albumLibraryColumns,
    data: albums,
    features: albumLibraryFeatures,
  });

  useTanStackTableDevtools(table);
  return (
    <section>
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "var(--font-sans)",
          fontSize: "0.9375rem",
          color: "var(--foreground)",
          background: "var(--background)",
        }}
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  style={{
                    width: `${header.getSize()}px`,
                    textAlign: "left",
                    padding: "0.625rem 0.875rem",
                    background: "var(--card)",
                    borderBottom: "1px solid var(--border)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--muted-foreground)",
                  }}
                >
                  {header.isPlaceholder ? null : (
                    <table.FlexRender header={header} />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getAllCells().map((cell) => (
                <td
                  key={cell.id}
                  style={{
                    padding: "0.5rem 0.875rem",
                    borderBottom: "1px solid var(--border)",
                  }}
                >
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <AlbumLibraryPagination table={table} />
    </section>
  );
};

interface AlbumLibraryProps {
  albums: Album[];
}
