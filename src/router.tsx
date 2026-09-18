import {
  createRootRoute,
  createRoute,
  createRouter,
  Link,
  Outlet,
} from "@tanstack/react-router";
import { Home } from "./routes/Home";

export const rootRoute = createRootRoute({
  component: () => (
    <>
      <nav>
        <Link to="/">Home</Link>
      </nav>
      <Outlet />
    </>
  ),
});

const home = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});
const routeTree = rootRoute.addChildren([home]);

export const router = createRouter({ routeTree });
