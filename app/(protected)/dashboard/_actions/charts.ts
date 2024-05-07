"use server";

import { getTransactions } from "@/app/actions/transactions";
import { Type } from "@/dto/types";

export interface Expense {
  occurredAt: Date;
  valueBrl: number;
}

export interface Summary {
  income: number;
  expenses: number;
}

export interface LabelSummary {
  label: string;
  totalValue: number;
}

export async function calculateSummary(
  profileId: string,
  startDate: Date,
  endDate: Date
) {
  try {
    const transactions = await getTransactions(profileId, startDate, endDate);
    const totalExpenses = transactions
      ?.filter((t) => t.type === Type.EXPENSE)
      .reduce((acc, cur) => acc + cur.valueBrl, 0);
    const totalIncome = transactions
      ?.filter((t) => t.type === Type.INCOME)
      .reduce((acc, cur) => acc + cur.valueBrl, 0);

    return { income: totalIncome ?? 0, expenses: totalExpenses ?? 0 };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch daily expenses data.");
  }
}

export async function getDailyExpenses(
  profileId: string,
  startDate: Date,
  endDate: Date
): Promise<Expense[]> {
  const transactions = await getTransactions(profileId, startDate, endDate);

  const dateList: Date[] = [];
  let currentDate = new Date(startDate);
  while (currentDate <= new Date(endDate)) {
    dateList.push(new Date(currentDate));
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return dateList.map((date) => {
    const transaction = transactions.find(
      (t) => t.occurredAt.toDateString() === date.toDateString()
    );
    return {
      occurredAt: date,
      valueBrl: transaction ? transaction.valueBrl : 0,
    };
  });
}

export async function getLabelSummary(
  profileId: string,
  startDate: Date,
  endDate: Date
): Promise<LabelSummary[]> {
  const transactions = await getTransactions(profileId, startDate, endDate);
  const labelMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    transaction.labels.forEach((label) => {
      if (labelMap.has(label.title)) {
        labelMap.set(
          label.title,
          labelMap.get(label.title)! + transaction.valueBrl
        );
      } else {
        labelMap.set(label.title, transaction.valueBrl);
      }
    });
  });

  const labelsWithTransactions: { label: string; totalValue: number }[] = [];
  labelMap.forEach((totalValue, label) => {
    labelsWithTransactions.push({ label, totalValue });
  });

  return labelsWithTransactions;
}
