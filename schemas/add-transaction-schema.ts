import { Label, Type } from "@/dto/types";
import { z } from "zod";

export const addTransactionSchema = z.object({
  title: z.string().min(1, "Title must be at least 1 character long."),
  valueBrl: z
    .string()
    .min(1, "Please select an amount >= 1.")
    .transform((value) => {
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    }),
  labels: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      profileId: z.string(),
      colorHex: z.string(),
      createdAt: z.date(),
      isActive: z.boolean(),
    })
  ),
  occurredAt: z.date({
    required_error: "A date of birth is required.",
  }),
  type: z.nativeEnum(Type).default(Type.EXPENSE),
});

export type AddTransactionFormData = z.infer<typeof addTransactionSchema>;
