"use server";

import prisma from "@/lib/prisma";
import { BudgetGoalType } from "@prisma/client";

interface AddBudgetGoalDTO {
  profileId: string;
  labelId: string;
  budgetId: string;
  value: number;
  type: BudgetGoalType;
}

export async function createBudgetGoal(budgetGoal: AddBudgetGoalDTO) {
  const { type, value, profileId, labelId, budgetId } = budgetGoal;
  await prisma.budgetGoal.create({
    data: { type, value, labelId, budgetId },
  });
}

export async function getBudgetGoalsByPeriod(
  profileId: string,
  month: number,
  year: number
) {
  return await prisma.budgetGoal.findMany({
    where: {
      budget: {
        month,
        year,
      },
    },
    select: {
      id: true,
      budget: true,
      label: true,
      type: true,
      value: true,
    },
  });
}
