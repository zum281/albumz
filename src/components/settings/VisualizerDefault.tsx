import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { VISUALIZERS } from "@/constants/visualizer";
import { useVisualizer } from "@/hooks/useVisualizer";
import type { FC } from "react";
import { SettingsCard } from "./helpers/SettingsCard";

export const VisualizerDefault: FC = () => {
  const { visualizer, updateVisualizer } = useVisualizer();

  return (
    <SettingsCard
      title="Visualizer"
      description="Default player visualizer: bars or turntable."
    >
      <Select
        items={VISUALIZERS}
        value={visualizer}
        onValueChange={updateVisualizer}
      >
        <SelectTrigger
          aria-label="Visualizer"
          className="cursor-pointer border-muted-foreground/70 bg-background font-mono text-xs text-muted-foreground"
        >
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {VISUALIZERS.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="font-mono text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsCard>
  );
};
