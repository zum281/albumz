import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { useQueryClient } from "@tanstack/react-query";
import { RefreshCw } from "lucide-react";
import type { FC } from "react";
import { useCallback, useEffect, useState } from "react";

export const AppSidebarRefreshButton: FC = () => {
  const queryClient = useQueryClient();

  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  const refresh = useCallback(async () => {
    if (isRefreshing) return;
    setIsRefreshing(true);
    try {
      await queryClient.invalidateQueries();
    } finally {
      setIsRefreshing(false);
    }
  }, [isRefreshing, queryClient]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "r" && !e.repeat) {
        e.preventDefault();
        void refresh();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [refresh]);

  return (
    <Button
      variant="ghost"
      size="icon"
      className="flex-1 group-data-[collapsible=icon]:w-full group-data-[collapsible=icon]:flex-none"
      title="Reload UI"
      aria-label="Reload UI"
      onClick={() => void refresh()}
      disabled={isRefreshing}
    >
      <RefreshCw className={cn(isRefreshing && "animate-spin")} />
    </Button>
  );
};
