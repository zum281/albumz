import { Boundaries } from "@/components/Boundaries";
import type { FC } from "react";
import { Count } from "./Count";
export const AppSidebarLibraryStat: FC = () => {
  return (
    <Boundaries getResetKey={() => "stat-library"}>
      <Count />
    </Boundaries>
  );
};
