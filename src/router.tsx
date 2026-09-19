import { SidebarProvider } from "@/components/ui/sidebar/SidebarProvider";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { AppSidebar } from "./components/app-sidebar/AppSidebar";
import { Home } from "./routes/Home";

export const rootRoute = createRootRoute({
  component: () => (
    <SidebarProvider>
      <AppSidebar />
      <Outlet />
    </SidebarProvider>
  ),
});

const home = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const routeTree = rootRoute.addChildren([home]);

export const router = createRouter({ routeTree });
