import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationSummary,
} from "@/components/ui/pagination";
import type { Album } from "@/types/album";
import { getPageWindow } from "@/utils/pagination";
import type { useTable } from "@tanstack/react-table";
import type { FC } from "react";
import { Fragment } from "react";
import type { albumLibraryFeatures } from "./AlbumLibrary.config";
import { AlbumLibraryPaginationPageSelect } from "./AlbumLibraryPaginationPagesSelect";

export const AlbumLibraryPagination: FC<AlbumLibraryPaginationProps> = ({
  table,
}) => {
  const { pageIndex, pageSize } = table.state.pagination;
  const rowCount = table.getRowCount();
  const pageCount = table.getPageCount();
  const first = rowCount === 0 ? 0 : pageIndex * pageSize + 1;
  const last = Math.min((pageIndex + 1) * pageSize, rowCount);

  return (
    <Pagination>
      <PaginationSummary>
        {first}–{last} of {rowCount}
      </PaginationSummary>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => {
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
          />
        </PaginationItem>
        {getPageWindow(pageIndex + 1, pageCount).map(({ page, gapBefore }) => (
          <Fragment key={page}>
            {gapBefore && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink
                isActive={page === pageIndex + 1}
                aria-label={`Page ${page} of ${pageCount}`}
                title={`Page ${page} of ${pageCount}`}
                onClick={() => {
                  table.setPageIndex(page - 1);
                }}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          </Fragment>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => {
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
          />
        </PaginationItem>
      </PaginationContent>
      <AlbumLibraryPaginationPageSelect table={table} />
    </Pagination>
  );
};

type AlbumLibraryPaginationProps = {
  table: ReturnType<typeof useTable<typeof albumLibraryFeatures, Album>>;
};
