import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

export const AppSidebarNavigationItem: FC<AppSidebarNavigationItemProps> = ({
  title,
  data,
  icon: Icon,
  isActive,
  linkProps,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        size="nav"
        render={<Link {...linkProps} />}
        isActive={isActive}
        tooltip={title}
      >
        <Icon />
        <span className="group-data-[collapsible=icon]:hidden">{title}</span>
        <span className="ml-auto font-mono text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          {data}
        </span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

type AppSidebarNavigationItemProps = {
  title: string;
  data: string | number;
  linkProps: LinkProps;
  isActive?: boolean;
  icon: LucideIcon;
};
