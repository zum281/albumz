import { useResolvedTheme } from "@/hooks/useResolvedTheme";
import type { ResolvedTheme } from "@/types/theme";
import type { FC } from "react";
import { SidebarHeader } from "../ui/sidebar/sidebar";

import AlbumzLogoAmoled from "@/assets/lockups/lockup-amoled.svg";
import AlbumzLogoDark from "@/assets/lockups/lockup-dark.svg";
import AlbumzLogoLight from "@/assets/lockups/lockup-light.svg";

import AlbumzMarkAmoled from "@/assets/marks/mark-amoled.svg";
import AlbumzMarkDark from "@/assets/marks/mark-dark.svg";
import AlbumzMarkLight from "@/assets/marks/mark-light.svg";

const LOGOS: Record<ResolvedTheme, string> = {
  light: AlbumzLogoLight,
  dark: AlbumzLogoDark,
  amoled: AlbumzLogoAmoled,
};

const MARKS: Record<ResolvedTheme, string> = {
  light: AlbumzMarkLight,
  dark: AlbumzMarkDark,
  amoled: AlbumzMarkAmoled,
};

export const AppSidebarLogo: FC = () => {
  const theme = useResolvedTheme();

  return (
    <SidebarHeader>
      <img
        src={LOGOS[theme]}
        alt="Albumz"
        className="h-9 self-start group-data-[collapsible=icon]:hidden"
      />
      <img
        src={MARKS[theme]}
        alt="Albumz"
        className="hidden size-7.5 group-data-[collapsible=icon]:block"
      />
    </SidebarHeader>
  );
};
