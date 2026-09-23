import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import type { Dispatch, FC, SetStateAction } from "react";

export const AlbumLibraryListenedFilter: FC<
  AlbumLibraryListenedFilterProps
> = ({ setListened }) => {
  return (
    <RadioGroup
      variant="segmented"
      aria-label="Listened status"
      defaultValue="all"
      onValueChange={(value: "all" | "played" | "backlog") => {
        setListened(value);
      }}
    >
      <RadioGroupItem variant="segmented" value="all">
        All
      </RadioGroupItem>
      <RadioGroupItem variant="segmented" value="played">
        Played
      </RadioGroupItem>
      <RadioGroupItem variant="segmented" value="backlog">
        Backlog
      </RadioGroupItem>
    </RadioGroup>
  );
};

interface AlbumLibraryListenedFilterProps {
  setListened: Dispatch<SetStateAction<"all" | "played" | "backlog">>;
}
