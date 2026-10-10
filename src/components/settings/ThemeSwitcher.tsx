import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { THEMES } from "@/constants/theme";
import { loadTheme, setTheme } from "@/theme";
import type { FC } from "react";
import { useState } from "react";
import { SettingsCard } from "./helpers/SettingsCard";

export const ThemeSwitcher: FC = () => {
  const [themeValue, setThemeValue] = useState(loadTheme);

  return (
    <SettingsCard
      title="Theme"
      description="Sleeve card palette: system, light, dark or amoled."
    >
      <Select
        items={THEMES}
        value={themeValue}
        onValueChange={(value) => {
          if (value === null) return;
          setThemeValue(value);
          void setTheme(value);
        }}
      >
        <SelectTrigger
          aria-label="Theme"
          className="cursor-pointer border-muted-foreground/70 bg-background font-mono text-xs text-muted-foreground"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {THEMES.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="font-mono text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsCard>
  );
};
