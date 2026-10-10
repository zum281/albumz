import { useRetry } from "@/hooks/useRetry";
import type { ErrorComponentProps } from "@tanstack/react-router";
import { CatchBoundary } from "@tanstack/react-router";
import type { FC, PropsWithChildren, ReactNode } from "react";
import { Suspense } from "react";
import { ErrorIcon } from "./errors/ErrorIcon";
import { Spinner } from "./ui/spinner";

export const Boundaries: FC<BoundariesProps> = ({
  loader,
  error,
  getResetKey,
  children,
}) => {
  const { retryCount } = useRetry();
  return (
    <CatchBoundary
      getResetKey={() => `${retryCount}-${String(getResetKey())}`}
      errorComponent={error ?? ErrorIcon}
    >
      <Suspense fallback={loader ?? <Spinner />}>{children}</Suspense>
    </CatchBoundary>
  );
};

type BoundariesProps = PropsWithChildren<{
  loader?: ReactNode;
  error?: FC<ErrorComponentProps>;
  getResetKey: () => unknown;
}>;
