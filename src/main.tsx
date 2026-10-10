import { RetryProvider } from "@/context/retry/RetryProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "@tanstack/react-router";
import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "./router";
import { loadTheme, setTheme, watchSystemTheme } from "./theme";

import "./css/main.css";

void setTheme(loadTheme());
void watchSystemTheme();

const queryClient = new QueryClient({
  defaultOptions: { queries: { throwOnError: true } },
});

const rootElement = document.getElementById("root");
if (!rootElement) throw new Error("Root element not found");

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RetryProvider>
        <RouterProvider router={router} />
      </RetryProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
