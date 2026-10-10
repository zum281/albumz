import type { FC, PropsWithChildren } from "react";
import { useCallback, useMemo, useState } from "react";
import { RetryContext } from "./RetryContext";

export const RetryProvider: FC<RetryProviderProps> = ({ children }) => {
  const [retryCount, setRetryCount] = useState(0);

  const retry = useCallback(() => {
    setRetryCount((c) => c + 1);
  }, []);

  const value = useMemo(() => ({ retryCount, retry }), [retryCount, retry]);

  return <RetryContext value={value}>{children}</RetryContext>;
};

type RetryProviderProps = PropsWithChildren;
