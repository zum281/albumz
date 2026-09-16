import { getCurrentWindow } from "@tauri-apps/api/window";

const THEME_LS_KEY = "albumz-theme";

export const setTheme = async (choice: ThemeChoice): Promise<void> => {
  const win = getCurrentWindow();
  try {
    if (choice === "system") {
      await win.setTheme(null);
      const osTheme = await win.theme();
      document.documentElement.setAttribute("data-theme", osTheme ?? "light");
    } else {
      await win.setTheme(choice);
      document.documentElement.setAttribute("data-theme", choice);
    }
    localStorage.setItem(THEME_LS_KEY, choice);
  } catch (err) {
    console.error("[theme] setTheme failed:", err);
  }
};

export const loadTheme = (): ThemeChoice => {
  return (localStorage.getItem(THEME_LS_KEY) as ThemeChoice) ?? "system";
};

export const watchSystemTheme = async (): Promise<void> => {
  const win = getCurrentWindow();
  await win.onThemeChanged(({ payload: osTheme }) => {
    if (loadTheme() === "system") {
      document.documentElement.setAttribute("data-theme", osTheme);
    }
  });
};

type ThemeChoice = "light" | "dark" | "system";
