import { positiveInteger } from "@/utils/zod";
import z from "zod";

const BacklogLeaderSchema = z.object({
  artist: z.string().min(1),
  count: positiveInteger,
});

export const BacklogLeadersSchema = z.array(BacklogLeaderSchema);
export type BacklogLeader = z.infer<typeof BacklogLeaderSchema>;
