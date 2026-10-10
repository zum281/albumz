import { SidebarProvider } from "@/components/ui/sidebar/SidebarProvider";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { AppSidebar } from "./components/app-sidebar/AppSidebar";
import { Boundaries } from "./components/Boundaries";
import { RouteHeader } from "./components/route-header/RouteHeader";
import { Home } from "./routes/Home";
import { Statz } from "./routes/Statz";

export const rootRoute = createRootRoute({
  component: () => (
    <SidebarProvider>
      <Boundaries
        getResetKey={() => "sidebar"}
        error={() => <div>Sidebar error</div>}
      >
        <AppSidebar />
      </Boundaries>
      <Outlet />
    </SidebarProvider>
  ),
  errorComponent: () => <div>Error</div>,
});

const home = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  errorComponent: () => <div>Home Error</div>,
});

const statz = createRoute({
  getParentRoute: () => rootRoute,
  path: "/statz",
  component: Statz,
  errorComponent: () => <div>Statz Error</div>,
});

const settings = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: () => <RouteHeader title="Settings" />,
});

const routeTree = rootRoute.addChildren([home, statz, settings]);

export const router = createRouter({ routeTree });
