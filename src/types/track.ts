import { positiveInteger } from "@/utils/zod";
import z from "zod";

export const TrackSchema = z.object({
  path: z.string(),
  title: z.string(),
  artist: z.string(),
  number: positiveInteger.nullable(),
  duration_seconds: positiveInteger,
});
export const TracksSchema = z.array(TrackSchema);

export type Track = z.infer<typeof TrackSchema>;
