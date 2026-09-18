import { Button } from "@/components/ui/button/button";
import type { Album } from "@/types/album";
import type { useTable } from "@tanstack/react-table";
import type { FC } from "react";
import type { albumLibraryFeatures } from "./AlbumLibrary.config";

export const AlbumLibraryPagination: FC<AlbumLibraryPaginationProps> = ({
  table,
}) => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 0",
      }}
    >
      <Button
        onClick={() => {
          table.firstPage();
        }}
        disabled={!table.getCanPreviousPage()}
        aria-label="First page"
      >
        «
      </Button>
      <Button
        onClick={() => {
          table.previousPage();
        }}
        disabled={!table.getCanPreviousPage()}
        aria-label="Previous page"
      >
        ‹
      </Button>
      <span
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "0.8125rem",
          color: "var(--muted-foreground)",
          padding: "0 0.5rem",
        }}
      >
        Page {table.state.pagination.pageIndex + 1} of {table.getPageCount()}
      </span>
      <Button
        onClick={() => {
          table.nextPage();
        }}
        disabled={!table.getCanNextPage()}
        aria-label="Next page"
      >
        ›
      </Button>
      <Button
        onClick={() => {
          table.lastPage();
        }}
        disabled={!table.getCanLastPage()}
        aria-label="Last page"
      >
        »
      </Button>
      <select
        value={table.state.pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        aria-label="Rows per page"
        className="ml-auto"
      >
        {[10, 20, 30, 40, 50].map((pageSize) => (
          <option key={pageSize} value={pageSize}>
            {pageSize} / page
          </option>
        ))}
      </select>
    </div>
  );
};

interface AlbumLibraryPaginationProps {
  table: ReturnType<typeof useTable<typeof albumLibraryFeatures, Album>>;
}
