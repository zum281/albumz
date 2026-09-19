import AlbumzLogo from "@/assets/lockups/lockup-dark.svg";
import AlbumzMark from "@/assets/marks/mark-dark.svg";
import type { FC } from "react";
import { SidebarHeader } from "../ui/sidebar/sidebar";

export const AppSidebarLogo: FC = () => {
  return (
    <SidebarHeader>
      <img
        src={AlbumzLogo}
        alt="Albumz"
        className="h-9 self-start group-data-[collapsible=icon]:hidden"
      />
      <img
        src={AlbumzMark}
        alt="Albumz"
        className="hidden size-7.5 group-data-[collapsible=icon]:block"
      />
    </SidebarHeader>
  );
};
