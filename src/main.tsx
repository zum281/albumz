import { TanStackDevtools } from "@tanstack/react-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { tableDevtoolsPlugin } from "@tanstack/react-table-devtools";
import React from "react";
import ReactDOM from "react-dom/client";
import { Home } from "./routes/Home";
import { loadTheme, setTheme, watchSystemTheme } from "./theme";

import "./css/main.css";

setTheme(loadTheme());
watchSystemTheme();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Home />
      <ReactQueryDevtools initialIsOpen={false} />
      <TanStackDevtools plugins={[tableDevtoolsPlugin()]} />
    </QueryClientProvider>
  </React.StrictMode>,
);
