import { z } from "zod";

export const addLabelSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long."),
  colorHex: z.string().min(1, "Hex Color must be at least 1 character long."),
});

export type AddLabelFormData = z.infer<typeof addLabelSchema>;
