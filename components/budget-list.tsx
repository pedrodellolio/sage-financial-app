"use client";

import React, { useEffect, useState } from "react";
import MonthChanger from "./month-changer";
import { formatCurrency } from "@/lib/utils";
import { createBudget, getBudgetByPeriod } from "@/app/actions/budget";
import BudgetCard from "@/app/(protected)/budget/components/budget-card";
import { useBudget } from "@/hooks/use-budget";
import { Budget, BudgetGoal } from "@/dto/types";
import { getBudgetGoalsByPeriod } from "@/app/actions/budgetGoal";
import { useSession } from "next-auth/react";

type Props = {
  monthIncome: number;
};

export default function BudgetList({ monthIncome }: Props) {
  const { period, budget, setBudget, goals } = useBudget();
  const { data: session } = useSession();
  const profileId = session?.user.selectedProfile?.id;

  const handleCreatingBudget = async () => {
    const [month, year] = period;
    let budget: Budget | null = null;
    if (profileId) budget = await createBudget(profileId, month, year);
    setBudget(budget);
  };

  return (
    <>
      <div className="flex flex-row justify-between border-b pb-2 mt-8">
        <MonthChanger />
        <p className="text-2xl font-bold text-primary">
          {formatCurrency(monthIncome)}
        </p>
      </div>

      {!budget ? (
        <div
          onClick={handleCreatingBudget}
          className="cursor-pointer h-96 border-2 border-dashed rounded-md mt-4 p-6 flex justify-center items-center hover:outline outline-2 outline-primary hover:text-primary"
        >
          <p>Adicionar metas ao planejamento</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
          {goals.map((goal) => {
            return (
              <div key={goal.id}>
                <BudgetCard data={goal} />
              </div>
            );
          })}
          <BudgetCard creating />
        </div>
      )}
    </>
  );
}
