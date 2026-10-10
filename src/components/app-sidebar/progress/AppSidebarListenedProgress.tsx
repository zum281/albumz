import { Boundaries } from "@/components/Boundaries";
import { ErrorSmall } from "@/components/errors/ErrorSmall";
import { type FC } from "react";
import { Count } from "./Count";

export const AppSidebarListenedProgress: FC = () => {
  return (
    <Boundaries
      getResetKey={() => "app-sidebar-listened-progress"}
      error={ErrorSmall}
    >
      <Count />
    </Boundaries>
  );
};
