import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import "./css/main.css";
import { Home } from "./routes/Home";
import { loadTheme, setTheme, watchSystemTheme } from "./theme";

setTheme(loadTheme());
watchSystemTheme();

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Home />
    </QueryClientProvider>
  </React.StrictMode>,
);
