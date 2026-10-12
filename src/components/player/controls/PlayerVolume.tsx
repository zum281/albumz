import { Button } from "@/components/ui/button/button";
import { Slider } from "@/components/ui/slider";
import { usePlayer } from "@/hooks/usePlayer";
import { useHotkey } from "@tanstack/react-hotkeys";
import { Volume2, VolumeX } from "lucide-react";
import type { FC } from "react";

export const PlayerVolume: FC = () => {
  const { volume, changeVolume, mute, unmute } = usePlayer();

  const muted = volume === 0;

  const handleVolumeChange = (value: number | readonly number[]) => {
    changeVolume(typeof value === "number" ? value : value[0]);
  };

  const handleMuteUnmute = () => {
    if (muted) unmute();
    else mute();
  };

  const handleVolumeUp = () => {
    changeVolume(volume + 1);
  };

  const handleVolumeDown = () => {
    changeVolume(volume - 1);
  };

  useHotkey("ArrowUp", handleVolumeUp);
  useHotkey("ArrowDown", handleVolumeDown);

  return (
    <div className="flex items-center gap-2 @xl:col-start-3 @xl:justify-self-end">
      <Button
        size="icon-sm"
        variant="link"
        className="shrink-0 text-muted-foreground"
        onClick={handleMuteUnmute}
      >
        {!muted && <Volume2 />}
        {muted && <VolumeX />}
      </Button>
      <Slider
        aria-label="Volume"
        className="data-horizontal:w-24"
        value={[volume]}
        onValueChange={handleVolumeChange}
      />
      <span className="w-8 text-right font-mono text-xs text-muted-foreground">
        {volume}
      </span>
    </div>
  );
};
