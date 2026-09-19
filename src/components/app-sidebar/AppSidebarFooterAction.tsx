import { Button } from "@/components/ui/button/button";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

export const AppSidebarFooterAction: FC<AppSidebarFooterActionProps> = ({
  title,
  icon: Icon,
}) => {
  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex-1 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex-none"
      title={title}
      aria-label={title}
    >
      <Icon />
    </Button>
  );
};

interface AppSidebarFooterActionProps {
  title: string;
  icon: LucideIcon;
}
