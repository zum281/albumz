import { SidebarContext } from "@/components/ui/sidebar/SidebarContext";
import { use } from "react";

export const useSidebar = () => {
  const context = use(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }

  return context;
};
