import type { FC } from "react";
import { SettingsCard } from "./helpers/SettingsCard";

export const DatabasePath: FC = () => {
  return (
    <SettingsCard
      title="Database"
      description="Everything stays on this machine. No account."
    >
      <span className="font-mono text-sm text-muted-foreground">
        ~/Library/Albumz
      </span>
    </SettingsCard>
  );
};
