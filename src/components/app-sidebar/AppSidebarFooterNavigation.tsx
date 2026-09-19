import { Button } from "@/components/ui/button/button";
import type { LinkProps } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import type { LucideIcon } from "lucide-react";
import type { FC } from "react";

export const AppSidebarFooterNavigation: FC<
  AppSidebarFooterNavigationProps
> = ({ title, icon: Icon, linkProps }) => {
  return (
    <Button
      render={<Link {...linkProps} />}
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

interface AppSidebarFooterNavigationProps {
  title: string;
  icon: LucideIcon;

  linkProps: LinkProps;
}
