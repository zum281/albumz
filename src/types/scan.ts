import { z } from "zod";
import { AlbumSchema } from "./album";

export const ScanResultSchema = AlbumSchema.omit({
  id: true,
  rating: true,
  listened: true,
  ignored: true,
  created_at: true,
  updated_at: true,
  source: true,
  media_type: true,
});

export type ScanResult = z.infer<typeof ScanResultSchema>;

export const ScanFormAlbumSchema = ScanResultSchema.extend({
  accepted: z.boolean(),
});

export type ScanFormAlbum = z.infer<typeof ScanFormAlbumSchema>;

export const ScanFormSchema = z.object({
  albums: z.array(ScanFormAlbumSchema),
});

export type ScanFormValues = z.infer<typeof ScanFormSchema>;
