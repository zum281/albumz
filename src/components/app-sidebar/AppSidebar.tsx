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
  BarChart3,
  Disc3,
  RefreshCw,
  RotateCw,
  ScanSearch,
  Settings,
} from "lucide-react";
import type { FC } from "react";
import { AppSidebarActionItem } from "./AppSidebarActionItem";
import { AppSidebarFooterAction } from "./AppSidebarFooterAction";
import { AppSidebarFooterNavigation } from "./AppSidebarFooterNavigation";
import { AppSidebarListenedProgress } from "./AppSidebarListenedProgress";
import { AppSidebarLogo } from "./AppSidebarLogo";
import { AppSidebarNavigationItem } from "./AppSidebarNavigationItem";

export const AppSidebar: FC = () => {
  return (
    <Sidebar collapsible="icon">
      <AppSidebarLogo />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <AppSidebarNavigationItem
              title="Library"
              data={412}
              icon={Disc3}
              linkProps={{ to: "/" }}
            />
            <AppSidebarNavigationItem
              title="Statz"
              data="3%"
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
              data="2h"
              tooltip="Scan for new albums"
              icon={ScanSearch}
            />
            <AppSidebarActionItem
              title="Metadata"
              tooltip="Refresh metadata"
              icon={RefreshCw}
            />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppSidebarListenedProgress />
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
