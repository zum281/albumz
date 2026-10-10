import type { FC } from "react";
import { SettingsCard } from "./helpers/SettingsCard";

export const ThemeSwitcher: FC = () => {
  return (
    <SettingsCard
      title="Theme"
      description="Sleeve card palette, light or dark."
    >
      <span className="font-mono text-sm text-muted-foreground">Dark</span>
    </SettingsCard>
  );
};
