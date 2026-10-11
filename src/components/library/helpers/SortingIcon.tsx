import type { Album } from "@/types/album";
import type { Column } from "@tanstack/react-table";
import {
  ArrowDown10,
  ArrowDownWideNarrow,
  ArrowDownZA,
  ArrowUp01,
  ArrowUpAZ,
  ArrowUpDown,
  ArrowUpNarrowWide,
} from "lucide-react";
import type { FC } from "react";
import type { albumLibraryFeatures } from "../AlbumLibrary.config";

export const SortingIcon: FC<SortingIconProps> = ({ headerCol }) => {
  const props = { size: 16, className: "text-accent-foreground" };
  const currentSorting = headerCol.getIsSorted();

  const datatype = headerCol.columnDef.meta?.dataType;

  if (!currentSorting) {
    if (!headerCol.getCanSort()) {
      return null;
    }
    return <ArrowUpDown size={props.size} className="text-accent" />;
  }

  if (datatype === "string") {
    return { asc: <ArrowUpAZ {...props} />, desc: <ArrowDownZA {...props} /> }[
      currentSorting
    ];
  }

  if (datatype === "number") {
    return { asc: <ArrowUp01 {...props} />, desc: <ArrowDown10 {...props} /> }[
      currentSorting
    ];
  }

  return {
    asc: <ArrowUpNarrowWide {...props} />,
    desc: <ArrowDownWideNarrow {...props} />,
  }[currentSorting];
};

type SortingIconProps = {
  headerCol: Column<typeof albumLibraryFeatures, Album>;
};
