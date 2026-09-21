import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarMenu,
  SidebarSeparator,
  SidebarTrigger,
} from "@/components/ui/sidebar/sidebar";
import {
  albumsQueryOptions,
  listenedAlbumsCountQueryOptions,
} from "@/db/albums";
import { getListenedAlbumsPercentage } from "@/utils/album";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart3,
  Disc3,
  RefreshCw,
  RotateCw,
  ScanSearch,
  Settings,
} from "lucide-react";
import { type FC } from "react";
import { ScanDialog } from "../scan/ScanDialog";
import { AppSidebarActionItem } from "./AppSidebarActionItem";
import { AppSidebarFooterAction } from "./AppSidebarFooterAction";
import { AppSidebarFooterNavigation } from "./AppSidebarFooterNavigation";
import { AppSidebarListenedProgress } from "./AppSidebarListenedProgress";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { AppSidebarNavigationItem } from "./AppSidebarNavigationItem";

export const AppSidebar: FC = () => {
  const { data: existingAlbums } = useQuery(albumsQueryOptions());
  const { data: listenedAlbumsCount = 0 } = useQuery(
    listenedAlbumsCountQueryOptions(),
  );

  const totalAlbumsCount = existingAlbums?.length ?? 0;

  const listenedAlbumsPercentage = getListenedAlbumsPercentage(
    totalAlbumsCount,
    listenedAlbumsCount,
  );

  return (
    <Sidebar collapsible="icon">
      <AppSidebarLogo />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {/* TODO: use skeleton and don't show button until data is ready */}
            <AppSidebarNavigationItem
              title="Library"
              data={totalAlbumsCount}
              icon={Disc3}
              linkProps={{ to: "/" }}
            />
            <AppSidebarNavigationItem
              title="Statz"
              data={`${listenedAlbumsPercentage.toFixed(1)}%`}
              icon={BarChart3}
              linkProps={{ to: "/statz" }}
            />
          </SidebarMenu>
        </SidebarGroup>
        <SidebarSeparator />
        <SidebarGroup>
          <SidebarMenu>
            <AppSidebarActionItem
              title="Scan"
              tooltip="Scan for new albums"
              icon={ScanSearch}
              actionContent={ScanDialog}
            />
            <AppSidebarActionItem
              title="Metadata"
              tooltip="Refresh metadata"
              icon={RefreshCw}
              actionContent={ScanDialog}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarListenedProgress
          total={totalAlbumsCount}
          listened={listenedAlbumsCount}
        />
        <SidebarSeparator />
        <div className="flex gap-px group-data-[collapsible=icon]:flex-col">
          <AppSidebarFooterAction title="Reload UI" icon={RotateCw} />
          <AppSidebarFooterNavigation
            title="Settings"
            icon={Settings}
            linkProps={{ to: "/settings" }}
          />
          <SidebarTrigger />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};
