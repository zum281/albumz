import { Button } from "@/components/ui/button/button";
import { useFullscreen } from "@/hooks/useFullscreen";
import { cn } from "@/lib/utils";
import { loadVisualizer, saveVisualizer } from "@/visualizer";
import { Maximize, X } from "lucide-react";
import type { FC } from "react";
import { ViewTransition, useState } from "react";
import { BarsVisualizer } from "./bars/BarsVisualizer";
import { ScopeVisualizer } from "./scope/ScopeVisualizer";
import { TurntableVisualizer } from "./turntable/TurntableVisualizer";
import { VisualizerSwitcher } from "./VisualizerSwitcher";

export const PlayerVisualizerPanel: FC = () => {
  const [visualizer, setVisualizer] = useState(loadVisualizer);
  const { fullscreen, toggleFullscreen } = useFullscreen();

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
        {visualizer === "bars" && <BarsVisualizer />}
        {visualizer === "turntable" && <TurntableVisualizer />}
        {visualizer === "scope" && <ScopeVisualizer />}
        <div
          className={cn(
            "absolute z-10 flex gap-1",
            fullscreen ? "top-6 right-6" : "top-2 right-2",
          )}
        >
          <VisualizerSwitcher
            value={visualizer}
            onChange={(next) => {
              setVisualizer(next);
              saveVisualizer(next);
            }}
          />
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
