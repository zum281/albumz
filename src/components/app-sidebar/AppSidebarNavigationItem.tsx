import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

export const AppSidebarNavigationItem: FC<AppSidebarNavigationItemProps> = ({
  title,
  data,
  icon: Icon,
  isActive,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="nav" isActive={isActive} tooltip={title}>
        <Icon />
        <span className="group-data-[collapsible=icon]:hidden">{title}</span>
        <span className="ml-auto font-mono text-[11.5px] text-muted-foreground group-data-[collapsible=icon]:hidden">
          {data}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface AppSidebarNavigationItemProps {
  title: string;
  data: string | number;
  isActive?: boolean;
  icon: LucideIcon;
}
