"use client";

import { BudgetProvider } from "@/contexts/budget-context";
import { ReactNode } from "react";

export function BudgetWrapper({ children }: { children: ReactNode }) {
  return <BudgetProvider>{children}</BudgetProvider>;
}
