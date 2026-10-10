import { positiveInteger } from "@/utils/zod";
import z from "zod";

const DecadeBreakdownRowSchema = z.object({
  decade: positiveInteger,
  listened: positiveInteger,
  backlog: positiveInteger,
});

export const DecadeBreakdownSchema = z.array(DecadeBreakdownRowSchema);
export type DecadeBreakdown = z.infer<typeof DecadeBreakdownSchema>;
