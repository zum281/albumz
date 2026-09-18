import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { RouterProvider } from "@tanstack/react-router";
import { tableDevtoolsPlugin } from "@tanstack/react-table-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import { loadTheme, setTheme, watchSystemTheme } from "./theme";

import "./css/main.css";

void setTheme(loadTheme());
void watchSystemTheme();

const queryClient = new QueryClient();

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackDevtools plugins={[tableDevtoolsPlugin()]} />
    </QueryClientProvider>
  </React.StrictMode>,
);
