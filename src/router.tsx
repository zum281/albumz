import { SidebarProvider } from "@/components/ui/sidebar/SidebarProvider";
import {
  CatchBoundary,
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import { Suspense } from "react";
import { AppSidebar } from "./components/app-sidebar/AppSidebar";
import { RouteHeader } from "./components/RouteHeader";
import { Spinner } from "./components/ui/spinner";
import { Home } from "./routes/Home";
import { Statz } from "./routes/Statz";

export const rootRoute = createRootRoute({
  component: () => (
    <SidebarProvider>
      <CatchBoundary
        getResetKey={() => "sidebar"}
        errorComponent={() => <div>Sidebar error</div>}
      >
        <Suspense fallback={<Spinner />}>
          <AppSidebar />
        </Suspense>
      </CatchBoundary>
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
