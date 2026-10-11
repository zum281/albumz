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
  AudioLines,
  BarChart3,
  Disc3,
  ScanSearch,
  Settings,
} from "lucide-react";
import { type FC } from "react";
import { ScanDialog } from "../scan/ScanDialog";
import { AppSidebarActionItem } from "./AppSidebarActionItem";
import { AppSidebarFooterNavigation } from "./AppSidebarFooterNavigation";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { AppSidebarNavigationItem } from "./AppSidebarNavigationItem";
import { AppSidebarRefreshButton } from "./AppSidebarRefreshButton";
import { AppSidebarListenedProgress } from "./progress/AppSidebarListenedProgress";
import { AppSidebarLibraryStat } from "./statz/library/AppSidebarLibraryStat";
import { AppSidebarListenedAlbumsPercentStat } from "./statz/listened-albums-percent/AppSidebarListenedAlbumsPercentStat";
import { AppSidebarPlayerStatus } from "./statz/player-status/AppSidebarPlayerStatus";

export const AppSidebar: FC = () => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarLogo />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <AppSidebarNavigationItem
              title="Library"
              data={<AppSidebarLibraryStat />}
              icon={Disc3}
              linkProps={{ to: "/" }}
            />
            <AppSidebarNavigationItem
              title="Statz"
              data={<AppSidebarListenedAlbumsPercentStat />}
              icon={BarChart3}
              linkProps={{ to: "/statz" }}
            />
            <AppSidebarNavigationItem
              title="Player"
              data={<AppSidebarPlayerStatus />}
              icon={AudioLines}
              linkProps={{ to: "/player" }}
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
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarListenedProgress />
        <SidebarSeparator />
        <div className="flex gap-px group-data-[collapsible=icon]:flex-col">
          <AppSidebarRefreshButton />
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
