import { RouteHeader } from "@/components/route-header/RouteHeader";
import { DatabasePath } from "@/components/settings/database-path/DatabasePath";
import { DeleteAllData } from "@/components/settings/DeleteAllData";
import { PlayerPicker } from "@/components/settings/PlayerPicker";
import { ThemeSwitcher } from "@/components/settings/ThemeSwitcher";
import type { FC } from "react";
export const Settings: FC = () => {
  return (
    <main className="flex min-w-0 flex-1 flex-col pb-7">
      <RouteHeader title="Settings" />
      <div className="flex flex-col gap-4 px-7 pt-6 pb-10">
        <PlayerPicker />
        <ThemeSwitcher />
        <DatabasePath />
        <DeleteAllData />
      </div>
    </main>
  );
};
