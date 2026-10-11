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
import { PlayerProvider } from "./context/player/PlayerProvider";
import { Home } from "./routes/Home";
import { Player } from "./routes/Player";
import { Settings } from "./routes/Settings";
import { Statz } from "./routes/Statz";

export const rootRoute = createRootRoute({
  component: () => (
    <PlayerProvider>
      <SidebarProvider>
        <Boundaries
          getResetKey={() => "sidebar"}
          error={() => <div>Sidebar error</div>}
        >
          <AppSidebar />
        </Boundaries>

        <Outlet />
      </SidebarProvider>
    </PlayerProvider>
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

const player = createRoute({
  getParentRoute: () => rootRoute,
  path: "/player",
  component: Player,
  errorComponent: ErrorLargeWithRetry,
});

const routeTree = rootRoute.addChildren([home, statz, settings, player]);

export const router = createRouter({ routeTree });
