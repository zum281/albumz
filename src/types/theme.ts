export type ThemeChoice = "light" | "dark" | "amoled" | "system";

export type ResolvedTheme = Exclude<ThemeChoice, "system">;
