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

const statz = createRoute({
  getParentRoute: () => rootRoute,
  path: "/statz",
  component: () => <main>Statz</main>,
});

const settings = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => <main>Settings</main>,
});

const routeTree = rootRoute.addChildren([home, statz, settings]);

export const router = createRouter({ routeTree });
