import type { FC } from "react";
import { SettingsCard } from "../helpers/SettingsCard";
import { DatabasePathValue } from "./DatabasePathValue";

export const DatabasePath: FC = () => {
  return (
    <SettingsCard title="Database" description="Everything is local.">
      <DatabasePathValue />
    </SettingsCard>
  );
};
