import { BudgetType } from "@/dto/types";
import { z } from "zod";

export const addBudgetSchema = z.object({
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
  value: z
    .string()
    .min(1, "Please select an amount >= 1.")
    .transform((value) => {
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    }),
  type: z.nativeEnum(BudgetType).default(BudgetType.PERCENTAGE),
});

export type AddBudgetFormData = z.infer<typeof addBudgetSchema>;
