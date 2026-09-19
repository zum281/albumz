import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

export const AppSidebarActionItem: FC<AppSidebarActionItemProps> = ({
  title,
  data,
  icon: Icon,
  tooltip,
  dataTitle,
}) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton size="action" tooltip={tooltip ?? title}>
        <Icon />
        <span className="group-data-[collapsible=icon]:hidden">{title}</span>
        {data !== undefined && (
          <span
            className="ml-auto font-mono text-[11.5px] text-muted-foreground group-data-[collapsible=icon]:hidden"
            title={dataTitle}
          >
            {data}
          </span>
        )}
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};

interface AppSidebarActionItemProps {
  title: string;
  tooltip?: string;
  data?: string | number;
  dataTitle?: string;
  icon: LucideIcon;
}
