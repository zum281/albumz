import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { LucideIcon } from "lucide-react";
import type { ComponentType, FC } from "react";

export const AppSidebarActionItem: FC<AppSidebarActionItemProps> = ({
  title,
  data,
  icon: Icon,
  tooltip,
  dataTitle,
  actionContent: ActionContent,
}) => {
  return (
    <SidebarMenuItem>
      <Dialog>
        <SidebarMenuButton
          size="action"
          render={<DialogTrigger />}
          tooltip={tooltip ?? title}
        >
          <Icon />
          <span className="group-data-[collapsible=icon]:hidden">{title}</span>
          {data !== undefined && (
            <span
              className="ml-auto font-mono text-xs text-muted-foreground group-data-[collapsible=icon]:hidden"
              title={dataTitle}
            >
              {data}
            </span>
          )}
        </SidebarMenuButton>
        <DialogContent className="flex max-h-[84vh] max-w-[calc(100%-4rem)] flex-col gap-0 overflow-hidden rounded-none border border-border p-0 ring-0 sm:max-w-3xl">
          <ActionContent />
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
};

interface AppSidebarActionItemProps {
  title: string;
  tooltip?: string;
  data?: string | number;
  dataTitle?: string;
  icon: LucideIcon;

  actionContent: ComponentType;
}
