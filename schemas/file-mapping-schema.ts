import { z } from "zod";

export const fileMappingSchema = z.object({
  mapping: z.array(
    z.object({
      key: z.enum(["title", "occurredAt", "valueBrl"]),
      value: z.string(),
    })
  ),
});

export type FileMappingFormData = z.infer<typeof fileMappingSchema>;
