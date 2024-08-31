import { z } from "zod";

export const addProfileSchema = z.object({
  title: z
    .string()
    .min(1, "Título não pode ser vazio.")
    .max(100, "Título não pode ser maior que 100 caracteres"),
});

export type AddProfileFormData = z.infer<typeof addProfileSchema>;
