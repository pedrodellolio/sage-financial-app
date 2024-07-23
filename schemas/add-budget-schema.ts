import { BudgetGoalType } from "@prisma/client";
import { z } from "zod";

export const addBudgetGoalSchema = z.object({
  label: z.object({
    id: z.string(),
    title: z.string(),
    profileId: z.string(),
    colorHex: z.string(),
    createdAt: z.date(),
    isActive: z.boolean(),
  }),
  value: z
    .string()
    .min(1, "Please select an amount >= 1.")
    .transform((value) => {
      return parseFloat(value.replace(/\./g, "").replace(",", "."));
    }),
  type: z.nativeEnum(BudgetGoalType).default(BudgetGoalType.PERCENTAGE),
});

export type AddBudgetGoalFormData = z.infer<typeof addBudgetGoalSchema>;
