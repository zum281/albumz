import { TableHead } from "@/components/ui/table";
import type { Album } from "@/types/album";
import type { Column, Header, useTable } from "@tanstack/react-table";
import { cn } from "cn";
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

  const ariaSort = () => {
    if (!sorted) return undefined;
    return sorted === "asc" ? "ascending" : "descending";
  };

  return (
    <TableHead
      scope="col"
      aria-sort={ariaSort()}
      style={{ width: header.getSize() }}
      className="relative"
    >
      {header.isPlaceholder ? null : (
        <>
          <div
            onClick={
              isDefaultSortColumn
                ? () => {
                    header.column.toggleSorting(sorted === "asc");
                  }
                : header.column.getToggleSortingHandler()
            }
            title={getHeaderTitle(header.column)}
            className="cursor-pointer"
          >
            <div
              className={cn(
                "flex gap-[1ch] items-center",
                header.column.columnDef.meta?.align === "center" &&
                  "justify-center",
              )}
            >
              <table.FlexRender header={header} />
              <SortingIcon headerCol={header.column} />
            </div>
          </div>
          {header.column.getCanResize() && (
            <div
              onDoubleClick={() => {
                header.column.resetSize();
              }}
              onMouseDown={header.getResizeHandler()}
              onTouchStart={header.getResizeHandler()}
              className={cn(
                "absolute top-0 right-0 h-full w-1 cursor-col-resize touch-none select-none border-r border-border hover:bg-primary",
                header.column.getIsResizing() && "bg-primary",
              )}
            />
          )}
        </>
      )}
    </TableHead>
  );
};

type AlbumLibraryHeaderProps = {
  table: ReturnType<typeof useTable<typeof albumLibraryFeatures, Album>>;
  header: Header<typeof albumLibraryFeatures, Album>;
};
