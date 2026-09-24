import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar/sidebar";
import type { LucideIcon } from "lucide-react";
import type { ComponentType, FC } from "react";

export const AppSidebarActionItem: FC<AppSidebarActionItemProps> = ({
  title,
  icon: Icon,
  tooltip,
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
        </SidebarMenuButton>
        <DialogContent className="flex max-h-[84vh] max-w-[calc(100%-4rem)] flex-col gap-0 overflow-hidden rounded-none border border-border p-0 ring-0 sm:max-w-3xl">
          <ActionContent />
        </DialogContent>
      </Dialog>
    </SidebarMenuItem>
  );
};

type AppSidebarActionItemProps = {
  title: string;
  tooltip?: string;
  icon: LucideIcon;

  actionContent: ComponentType;
};
