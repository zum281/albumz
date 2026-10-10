import { createContext } from "react";
import type { RetryContextType } from "./RetryContext.types";

export const RetryContext = createContext<RetryContextType | null>(null);
