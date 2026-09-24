import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAlbumLibraryFilters } from "@/hooks/useAlbumLibraryFilters";
import { AlbumListenedToggle } from "@/types/enums";
import type { FC } from "react";

export const AlbumLibraryListenedFilter: FC = () => {
  const { updateListenedToggle } = useAlbumLibraryFilters();
  return (
    <RadioGroup
      variant="segmented"
      aria-label="Listened status"
      defaultValue={AlbumListenedToggle.ALL}
      onValueChange={(value: AlbumListenedToggle) => {
        updateListenedToggle(value);
      }}
    >
      <RadioGroupItem variant="segmented" value={AlbumListenedToggle.ALL}>
        All
      </RadioGroupItem>
      <RadioGroupItem variant="segmented" value={AlbumListenedToggle.PLAYED}>
        Played
      </RadioGroupItem>
      <RadioGroupItem variant="segmented" value={AlbumListenedToggle.BACKLOG}>
        Backlog
      </RadioGroupItem>
    </RadioGroup>
  );
};
