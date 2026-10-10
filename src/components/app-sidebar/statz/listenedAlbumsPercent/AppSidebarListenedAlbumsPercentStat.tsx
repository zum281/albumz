import { Spinner } from "@/components/ui/spinner";
import { CatchBoundary } from "@tanstack/react-router";
import type { FC } from "react";
import { Suspense } from "react";
import { Count } from "./Count";

export const AppSidebarListenedAlbumsPercentStat: FC = () => {
  return (
    <CatchBoundary
      getResetKey={() => "miao"}
      errorComponent={() => <p>error</p>}
    >
      <Suspense fallback={<Spinner />}>
        <Count />
      </Suspense>
    </CatchBoundary>
  );
};
