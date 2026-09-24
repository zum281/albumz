import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useAlbumLibraryFilters } from "@/hooks/useAlbumLibraryFilters";
import { Search } from "lucide-react";
import type { FC } from "react";

export const AlbumLibrarySearch: FC = () => {
  const { updateQuery } = useAlbumLibraryFilters();

  return (
    <InputGroup className="h-auto w-auto grow basis-55">
      <InputGroupAddon align="inline-start">
        <Search />
      </InputGroupAddon>
      <InputGroupInput
        id="input-group-search"
        className="h-auto self-stretch"
        placeholder="Search album or artist..."
        onChange={(e) => {
          updateQuery(e.target.value);
        }}
      />
    </InputGroup>
  );
};
