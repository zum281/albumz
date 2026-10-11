import { TableHead } from "@/components/ui/table";
import type { Album } from "@/types/album";
import type { Column, Header, useTable } from "@tanstack/react-table";
import type { FC } from "react";
import type { albumLibraryFeatures } from "./AlbumLibrary.config";
import { SortingIcon } from "./helpers/SortingIcon";

const DEFAULT_SORT_COLUMN_ID = "artist";

export const AlbumLibraryHeader: FC<AlbumLibraryHeaderProps> = ({
  table,
  header,
}) => {
  const sorted = header.column.getIsSorted();
  // Artist is the default sort, so it only toggles asc/desc, never unsorted.
  const isDefaultSortColumn = header.column.id === DEFAULT_SORT_COLUMN_ID;

  const getNextSortingOrder = (
    headerColumn: Column<typeof albumLibraryFeatures, Album>,
  ) => {
    if (isDefaultSortColumn) return sorted === "asc" ? "desc" : "asc";
    return headerColumn.getNextSortingOrder();
  };

  const getHeaderTitle = (
    headerColumn: Column<typeof albumLibraryFeatures, Album>,
  ) => {
    if (!headerColumn.getCanSort()) return;
    if (getNextSortingOrder(headerColumn) === "asc") return "Sort ascending";
    if (getNextSortingOrder(headerColumn) === "desc") return "Sort descending";
    return "Clear sort";
  };

  return (
    <TableHead
      scope="col"
      aria-sort={
        sorted ? (sorted === "asc" ? "ascending" : "descending") : undefined
      }
      style={{ width: header.getSize() }}
      onClick={
        isDefaultSortColumn
          ? () => header.column.toggleSorting(sorted === "asc")
          : header.column.getToggleSortingHandler()
      }
      className="cursor-pointer"
      title={getHeaderTitle(header.column)}
    >
      {header.isPlaceholder ? null : (
        <div className="flex gap-[1ch] items-center">
          <table.FlexRender header={header} />
          <SortingIcon headerCol={header.column} />
        </div>
      )}
    </TableHead>
  );
};

type AlbumLibraryHeaderProps = {
  table: ReturnType<typeof useTable<typeof albumLibraryFeatures, Album>>;
  header: Header<typeof albumLibraryFeatures, Album>;
};
