import { Slider } from "@/components/ui/slider";
import { selectOnFirstClick, selectOnFocus } from "@/utils/ui";
import type { Dispatch, FC, SetStateAction } from "react";
import { useState } from "react";

export const AlbumLibraryYearFilter: FC<AlbumLibraryYearFilterProps> = ({
  minYear,
  maxYear,
  years,
  setYears,
}) => {
  const [minDraft, setMinDraft] = useState<string>(String(minYear));
  const [maxDraft, setMaxDraft] = useState<string>(String(maxYear));

  const commitMin = () => {
    const parsed = Number.parseInt(minDraft, 10);
    const next = Number.isNaN(parsed)
      ? years[0]
      : Math.min(Math.max(parsed, minYear), years[1]);
    setYears([next, years[1]]);
    setMinDraft(String(next));
  };

  const commitMax = () => {
    const parsed = Number.parseInt(maxDraft, 10);
    const next = Number.isNaN(parsed)
      ? years[1]
      : Math.max(Math.min(parsed, maxYear), years[0]);
    setYears([years[0], next]);
    setMaxDraft(String(next));
  };

  return (
    <div className="flex grow basis-64 items-center gap-2 border border-border bg-card px-3 py-2.25 font-mono text-xs tabular-nums">
      <span className="tracking-widest text-muted-foreground uppercase">
        Years
      </span>
      <input
        type="text"
        inputMode="numeric"
        size={4}
        onMouseDown={selectOnFirstClick}
        onFocus={selectOnFocus}
        aria-label="Min year"
        className="bg-transparent p-0 text-center tabular-nums outline-none focus:outline-1 focus:outline-solid focus:outline-offset-2 focus:outline-primary"
        value={minDraft}
        onChange={(e) => {
          setMinDraft(e.target.value);
          const parsed = Number.parseInt(e.target.value, 10);
          if (parsed >= minYear && parsed <= years[1]) {
            setYears([parsed, years[1]]);
          }
        }}
        onBlur={commitMin}
        onKeyDown={(e) => {
          if (e.key === "Enter") commitMin();
        }}
      />
      <div className="shrink-0 grow basis-21">
        <Slider
          value={years}
          min={minYear}
          max={maxYear}
          step={1}
          onValueChange={(value) => {
            const [min, max] = value as number[];
            setYears([min, max]);
            setMinDraft(String(min));
            setMaxDraft(String(max));
          }}
        />
      </div>
      <input
        type="text"
        inputMode="numeric"
        size={4}
        onMouseDown={selectOnFirstClick}
        onFocus={selectOnFocus}
        aria-label="Max year"
        className="bg-transparent p-0 text-center tabular-nums outline-none focus:outline-1 focus:outline-solid focus:outline-offset-2 focus:outline-primary"
        value={maxDraft}
        onChange={(e) => {
          setMaxDraft(e.target.value);
          const parsed = Number.parseInt(e.target.value, 10);
          if (parsed >= years[0] && parsed <= maxYear) {
            setYears([years[0], parsed]);
          }
        }}
        onBlur={commitMax}
        onKeyDown={(e) => {
          if (e.key === "Enter") commitMax();
        }}
      />
    </div>
  );
};

type AlbumLibraryYearFilterProps = {
  minYear: number;
  maxYear: number;
  years: number[];
  setYears: Dispatch<SetStateAction<number[]>>;
};
