import { Button } from "@/components/ui/button/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { VISUALIZERS } from "@/constants/visualizer";
import type { VisualizerChoice } from "@/types/visualizer";
import { AudioLines } from "lucide-react";
import type { FC } from "react";

export const VisualizerSwitcher: FC<VisualizerSwitcherProps> = ({
  value,
  onChange,
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Switch visualizer"
            className="absolute top-2 right-2 z-10"
          />
        }
      >
        <AudioLines />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuRadioGroup
          value={value}
          onValueChange={(next) => {
            onChange(next as VisualizerChoice);
          }}
        >
          {VISUALIZERS.map(({ value, label }) => (
            <DropdownMenuRadioItem
              key={value}
              value={value}
              className="font-mono text-xs"
            >
              {label}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

type VisualizerSwitcherProps = {
  value: VisualizerChoice;
  onChange: (value: VisualizerChoice) => void;
};
