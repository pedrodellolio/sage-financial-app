"use client";

import { getBudgetByPeriod } from "@/app/actions/budget";
import { BudgetGoal } from "@/dto/types";
import { getCurrentPeriod } from "@/lib/utils";
import { Budget } from "@prisma/client";
import { useSession } from "next-auth/react";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";

interface BudgetContextData {
  period: [number, number];
  setPeriod: Dispatch<SetStateAction<[number, number]>>;
  budget: Budget | null;
  setBudget: Dispatch<SetStateAction<Budget | null>>;
  goals: BudgetGoal[];
}

const BudgetContext = createContext<BudgetContextData>({} as BudgetContextData);
export const BudgetProvider = ({ children }: { children: ReactNode }) => {
  const { data: session } = useSession();
  const profileId = session?.user.selectedProfile?.id;

  const [period, setPeriod] = useState<[number, number]>(getCurrentPeriod());
  const [budget, setBudget] = useState<Budget | null>(null);
  const [goals, setGoals] = useState<BudgetGoal[]>([]);
  // console.log(goals);
  useEffect(() => {
    const [month, year] = period;
    profileId &&
      getBudgetByPeriod(profileId, month, year).then((res) => {
        if (res) {
          const budget = {
            id: res.id,
            profileId: res.profileId,
            month: res.month,
            year: res.year,
          };
          setBudget(budget);
          setGoals(res.BudgetGoal);
        }
      });
  }, [period]);

  return (
    <BudgetContext.Provider
      value={{
        period,
        setPeriod,
        budget,
        setBudget,
        goals,
      }}
    >
      {children}
    </BudgetContext.Provider>
  );
};
export default BudgetContext;
