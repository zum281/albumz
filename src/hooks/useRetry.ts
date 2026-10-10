import { RetryContext } from "@/context/retry/RetryContext";
import { use } from "react";

export const useRetry = () => {
  const context = use(RetryContext);
  if (!context) {
    throw new Error("useRetry must be used within a RetryContext.");
  }

  return context;
};
