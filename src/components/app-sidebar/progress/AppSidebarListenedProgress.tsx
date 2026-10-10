import { Spinner } from "@/components/ui/spinner";
import { CatchBoundary } from "@tanstack/react-router";
import { Suspense, type FC } from "react";
import { Count } from "./Count";

export const AppSidebarListenedProgress: FC = () => {
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
