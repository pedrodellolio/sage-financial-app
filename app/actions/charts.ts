"use server";

import { getTransactions } from "@/app/actions/transactions";
// import { TransactionType, Wallet } from "@/dto/types";
import { prisma } from "@/lib/prisma";
import { TransactionType, Wallet } from "@prisma/client";

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
  startDate?: Date,
  endDate?: Date
) {
  try {
    const transactions = await getTransactions(startDate, endDate);
    const totalExpenses = transactions
      ?.filter((t) => t.type === TransactionType.EXPENSE)
      .reduce((acc, cur) => acc + cur.valueBrl.toNumber(), 0);
    const totalIncome = transactions
      ?.filter((t) => t.type === TransactionType.INCOME)
      .reduce((acc, cur) => acc + cur.valueBrl.toNumber(), 0);

    return { income: totalIncome ?? 0, expenses: totalExpenses ?? 0 };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch daily expenses data.");
  }
}

export async function getPeriodIncome(
  startDate?: Date,
  endDate?: Date
) {
  const transactions = await getTransactions(startDate, endDate);
  return transactions
    ?.filter((t) => t.type === TransactionType.INCOME)
    .reduce((acc, cur) => acc + cur.valueBrl.toNumber(), 0);
}

export async function getDailyExpenses(
  profileId: string,
  startDate: Date,
  endDate: Date
): Promise<Expense[]> {
  // await new Promise((resolve) => setTimeout(resolve, 3000));
  
  const transactions = await getTransactions(startDate, endDate);

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
      valueBrl: transaction ? transaction.valueBrl.toNumber() : 0,
    };
  });
}

export async function getLabelSummary(
  profileId: string,
  startDate?: Date,
  endDate?: Date
): Promise<LabelSummary[]> {
  const transactions = await getTransactions(startDate, endDate);
  const labelMap = new Map<string, number>();

  transactions.forEach((transaction) => {
    transaction.labels.forEach((label) => {
      if (labelMap.has(label.title)) {
        labelMap.set(
          label.title,
          labelMap.get(label.title)! + transaction.valueBrl.toNumber()
        );
      } else {
        labelMap.set(label.title, transaction.valueBrl.toNumber());
      }
    });
  });

  const labelsWithTransactions: { label: string; totalValue: number }[] = [];
  labelMap.forEach((totalValue, label) => {
    labelsWithTransactions.push({ label, totalValue });
  });

  return labelsWithTransactions;
}

export async function getMonthlyTrend(profileId: string): Promise<Wallet[]> {
  const currentYear = new Date().getFullYear();
  const wallet = await prisma.wallet.findMany({
    where: {
      profile: { id: profileId },
      year: currentYear,
      month: { lte: 12, gte: 1 },
    },
  });

  return wallet.map((w) => {
    return {
      ...w,
      expensesBrl: w.expensesBrl,
      incomeBrl: w.incomeBrl,
    };
  });
}
