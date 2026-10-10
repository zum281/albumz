import type { FC } from "react";
import { SettingsCard } from "./helpers/SettingsCard";

export const PlayerPicker: FC = () => {
  return (
    <SettingsCard
      title="Open albums with"
      description="External player launched from a row."
    >
      <span className="font-mono text-sm text-muted-foreground">
        Apple Music
      </span>
    </SettingsCard>
  );
};
