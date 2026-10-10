import { SidebarProvider } from "@/components/ui/sidebar/SidebarProvider";
import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { AppSidebar } from "./components/app-sidebar/AppSidebar";
import { Boundaries } from "./components/Boundaries";
import { ErrorLargeWithRetry } from "./components/errors/ErrorLargeWithRetry";
import { Home } from "./routes/Home";
import { Settings } from "./routes/Settings";
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
  errorComponent: ErrorLargeWithRetry,
});

const home = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
  errorComponent: ErrorLargeWithRetry,
});

const statz = createRoute({
  getParentRoute: () => rootRoute,
  path: "/statz",
  component: Statz,
  errorComponent: ErrorLargeWithRetry,
});

const settings = createRoute({
  getParentRoute: () => rootRoute,
  path: "/settings",
  component: Settings,
  errorComponent: ErrorLargeWithRetry,
});

const routeTree = rootRoute.addChildren([home, statz, settings]);

export const router = createRouter({ routeTree });
