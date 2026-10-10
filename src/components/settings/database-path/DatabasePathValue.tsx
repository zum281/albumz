import { dbPathQueryOptions } from "@/db/db";
import { useSuspenseQuery } from "@tanstack/react-query";
import type { FC } from "react";

export const DatabasePathValue: FC = () => {
  const { data: path } = useSuspenseQuery(dbPathQueryOptions());

  return (
    <span className="font-mono text-sm text-muted-foreground">{path}</span>
  );
};
