import { z } from "zod";

export const addLabelSchema = z.object({
  title: z.string().min(1, "Necessário informar um título."),
  colorHex: z.string(),
});
export type AddLabelFormData = z.infer<typeof addLabelSchema>;

export const addLabelsSchema = z.object({
  labels: z.array(addLabelSchema).min(1, "Selecione pelo menos uma categoria."),
});
export type AddLabelsFormData = z.infer<typeof addLabelsSchema>;
