"use server";

import prisma from "@/lib/prisma";

export async function createBudget(profileId: string, month: number, year: number) {
  return await prisma.budget.create({
    data: { profileId, month, year },
  });
}

export async function getBudgetByPeriod(profileId: string, month: number, year: number) {
  return await prisma.budget.findFirst({
    where: { profileId, month, year },
    include: {
      BudgetGoal: {
        include: {
          label: true,
          budget: true,
        },
      },
    },
  });
}
