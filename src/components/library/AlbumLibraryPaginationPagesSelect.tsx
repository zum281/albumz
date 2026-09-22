import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Album } from "@/types/album";
import { PAGE_SIZES } from "@/utils/pagination";
import type { useTable } from "@tanstack/react-table";
import type { FC } from "react";
import type { albumLibraryFeatures } from "./AlbumLibrary.config";

export const AlbumLibraryPaginationPageSelect: FC<
  AlbumLibraryPaginationPagesSelect
> = ({ table }) => {
  const { pageSize } = table.state.pagination;

  const pageSizeItems = [
    ...PAGE_SIZES.map((size) => ({ value: size, label: `${size} / page` })),
  ];

  return (
    <Select
      items={pageSizeItems}
      value={pageSize}
      onValueChange={(value) => {
        if (value !== null) table.setPageSize(value);
      }}
    >
      <SelectTrigger
        aria-label="Rows per page"
        className="cursor-pointer border-muted-foreground/70 bg-background font-mono text-xs text-muted-foreground"
      >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {pageSizeItems.map(({ value, label }) => (
          <SelectItem key={label} value={value} className="font-mono text-xs">
            {label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

interface AlbumLibraryPaginationPagesSelect {
  table: ReturnType<typeof useTable<typeof albumLibraryFeatures, Album>>;
}
