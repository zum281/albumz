import type { FC } from "react";
import type { Album } from "../../types/album";

import { useTable } from "@tanstack/react-table";
import { useTanStackTableDevtools } from "@tanstack/react-table-devtools";
import {
  albumLibraryColumns,
  albumLibraryFeatures,
} from "./AlbumLibrary.config";

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
      <p>Total albums: {albums.length}</p>
      <br />
      <table
        style={{
          borderCollapse: "collapse",
          width: "100%",
          fontFamily: "var(--font-body)",
          fontSize: "0.9375rem",
          color: "var(--clr-text)",
          background: "var(--clr-bg)",
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
                    background: "var(--clr-surface)",
                    borderBottom: "1px solid var(--clr-border)",
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.8125rem",
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: "var(--clr-text-muted)",
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
                    borderBottom: "1px solid var(--clr-border)",
                  }}
                >
                  <table.FlexRender cell={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

type AlbumLibraryProps = {
  albums: Album[];
};
