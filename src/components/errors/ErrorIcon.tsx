import { TriangleAlert } from "lucide-react";
import type { FC } from "react";

export const ErrorIcon: FC = () => {
  return <TriangleAlert className="text-destructive" />;
};
