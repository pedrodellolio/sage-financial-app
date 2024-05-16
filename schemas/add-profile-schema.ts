import { z } from "zod";

export const addProfileSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long."),
});

export type AddProfileFormData = z.infer<typeof addProfileSchema>;
