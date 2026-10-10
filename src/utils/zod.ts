import z from "zod";

export const sqliteBool = z
  .number()
  .int()
  .min(0)
  .max(1)
  .transform((v) => v === 1);

export const positiveInteger = z.number().int().nonnegative();
