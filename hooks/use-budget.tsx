"use client";

import BudgetContext from "@/contexts/budget-context";
import { useContext } from "react";

export function useBudget() {
  const context = useContext(BudgetContext);
  return context;
}
