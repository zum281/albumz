import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PLAYERS } from "@/constants/player";
import type { FC } from "react";
import { useState } from "react";
import { SettingsCard } from "./helpers/SettingsCard";

export const PlayerPicker: FC = () => {
  const [player, setPlayer] = useState<string | null>(null);

  return (
    <SettingsCard
      title="Open albums with"
      description="External player launched from a row."
    >
      <Select items={PLAYERS} value={player} onValueChange={setPlayer}>
        <SelectTrigger
          aria-label="Player"
          className="cursor-pointer border-muted-foreground/70 bg-background font-mono text-xs text-muted-foreground"
        >
          <SelectValue placeholder="Choose a player" />
        </SelectTrigger>
        <SelectContent>
          {PLAYERS.map(({ value, label }) => (
            <SelectItem key={value} value={value} className="font-mono text-xs">
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </SettingsCard>
  );
};
