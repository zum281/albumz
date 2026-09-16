import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/main.css";
import { loadTheme, setTheme, watchSystemTheme } from "./theme";

setTheme(loadTheme());
watchSystemTheme();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
