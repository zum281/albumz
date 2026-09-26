import { SidebarProvider } from "@/components/ui/sidebar/SidebarProvider";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { AppSidebar } from "./components/app-sidebar/AppSidebar";
import { RouteHeader } from "./components/RouteHeader";
import { Home } from "./routes/Home";
import { Statz } from "./routes/Statz";

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

const statz = createRoute({
  getParentRoute: () => rootRoute,
  path: "/statz",
  component: Statz,
});

const settings = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => <RouteHeader title="Settings" />,
});

const routeTree = rootRoute.addChildren([home, statz, settings]);

export const router = createRouter({ routeTree });
