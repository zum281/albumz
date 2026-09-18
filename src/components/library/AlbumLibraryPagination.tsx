import type { useTable } from "@tanstack/react-table";
import type { FC } from "react";
import type { Album } from "@/types/album";
import type { albumLibraryFeatures } from "./AlbumLibrary.config";

export const AlbumLibraryPagination: FC<AlbumLibraryPaginationProps> = ({
  table,
}) => {
  const buttonStyle = {
    padding: "0.375rem 0.625rem",
    borderRadius: "var(--radius)",
    border: "1px solid var(--border)",
    background: "var(--card)",
    color: "var(--foreground)",
    fontFamily: "var(--font-mono)",
    fontSize: "0.875rem",
    cursor: "pointer",
  } as const;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        padding: "0.75rem 0",
      }}
    >
      <button
        type="button"
        onClick={() => {
          table.firstPage();
        }}
        disabled={!table.getCanPreviousPage()}
        style={buttonStyle}
        aria-label="First page"
      >
        «
      </button>
      <button
        type="button"
        onClick={() => {
          table.previousPage();
        }}
        disabled={!table.getCanPreviousPage()}
        style={buttonStyle}
        aria-label="Previous page"
      >
        ‹
      </button>
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
      <button
        type="button"
        onClick={() => {
          table.nextPage();
        }}
        disabled={!table.getCanNextPage()}
        style={buttonStyle}
        aria-label="Next page"
      >
        ›
      </button>
      <button
        type="button"
        onClick={() => {
          table.lastPage();
        }}
        disabled={!table.getCanLastPage()}
        style={buttonStyle}
        aria-label="Last page"
      >
        »
      </button>
      <select
        value={table.state.pagination.pageSize}
        onChange={(e) => {
          table.setPageSize(Number(e.target.value));
        }}
        style={{ ...buttonStyle, marginLeft: "auto" }}
        aria-label="Rows per page"
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
