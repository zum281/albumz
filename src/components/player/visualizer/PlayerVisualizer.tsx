import { Button } from "@/components/ui/button/button";
import { useFullscreen } from "@/hooks/useFullscreen";
import { useVisualizer } from "@/hooks/useVisualizer";
import { cn } from "@/lib/utils";
import { Maximize, X } from "lucide-react";
import type { FC } from "react";
import { ViewTransition } from "react";
import { Visualizer } from "./Visualizer";
import { VisualizerSwitcher } from "./VisualizerSwitcher";

export const PlayerVisualizerPanel: FC = () => {
  const { fullscreen, toggleFullscreen } = useFullscreen();
  const { visualizer, updateVisualizer } = useVisualizer();

  return (
    <ViewTransition name="visualizer-panel" default="none" share="auto">
      <div
        className={cn(
          "relative flex flex-col [view-transition-name:visualizer-panel]",
          fullscreen
            ? "fixed inset-0 z-50 bg-background p-4"
            : "h-[clamp(15rem,44vh,27.5rem)]",
        )}
      >
        <Visualizer />
        <div
          className={cn(
            "absolute z-10 flex gap-1",
            fullscreen ? "top-6 right-6" : "top-2 right-2",
          )}
        >
          <VisualizerSwitcher value={visualizer} onChange={updateVisualizer} />
          <Button
            variant="ghost"
            size="icon"
            aria-label={fullscreen ? "Exit fullscreen" : "Enter fullscreen"}
            onClick={() => {
              toggleFullscreen(!fullscreen);
            }}
          >
            {fullscreen ? <X /> : <Maximize />}
          </Button>
        </div>
      </div>
    </ViewTransition>
  );
};
