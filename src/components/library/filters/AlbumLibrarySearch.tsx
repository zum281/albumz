import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Search } from "lucide-react";
import type { Dispatch, FC, SetStateAction } from "react";

export const AlbumLibrarySearch: FC<AlbumLibrarySearchProps> = ({
  setQuery,
}) => {
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
          setQuery(e.target.value);
        }}
      />
    </InputGroup>
  );
};

type AlbumLibrarySearchProps = { setQuery: Dispatch<SetStateAction<string>> };
