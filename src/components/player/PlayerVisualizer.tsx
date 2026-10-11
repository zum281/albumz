import { Button } from "@/components/ui/button/button";
import { cn } from "@/lib/utils";
import { loadVisualizer, saveVisualizer } from "@/visualizer";
import { Maximize, X } from "lucide-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import { BarsVisualizer } from "./bars/BarsVisualizer";
import { TurntableVisualizer } from "./turntable/TurntableVisualizer";
import { VisualizerSwitcher } from "./VisualizerSwitcher";

export const PlayerVisualizerPanel: FC = () => {
  const [visualizer, setVisualizer] = useState(loadVisualizer);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    if (!fullscreen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setFullscreen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [fullscreen]);

  return (
    <div
      className={cn(
        "relative flex flex-col",
        fullscreen
          ? "fixed inset-0 z-50 bg-background p-4"
          : "h-[clamp(15rem,44vh,27.5rem)]",
      )}
    >
      {visualizer === "bars" ? <BarsVisualizer /> : <TurntableVisualizer />}
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
            setFullscreen(!fullscreen);
          }}
        >
          {fullscreen ? <X /> : <Maximize />}
        </Button>
      </div>
    </div>
  );
};
