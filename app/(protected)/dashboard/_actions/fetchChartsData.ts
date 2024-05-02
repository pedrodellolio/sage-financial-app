import { Transaction, TransactionType } from "@/models/transaction";
import { unstable_noStore as noStore } from "next/cache";

export async function calculateSummary(
  profileTitle: string,
  startDate: Date,
  endDate: Date
) {
  noStore();
  try {
    const transactions: Transaction[] = [];
    const totalExpenses = transactions
      ?.filter((t) => t.type === TransactionType.Expense)
      .reduce((acc, cur) => acc + cur.value_brl, 0);
    const totalIncome = transactions
      ?.filter((t) => t.type === TransactionType.Income)
      .reduce((acc, cur) => acc + cur.value_brl, 0);

    return { income: totalIncome ?? 0, expenses: totalExpenses ?? 0 };
  } catch (error) {
    console.error("Database Error:", error);
    throw new Error("Failed to fetch daily expenses data.");
  }
}

export async function getDailyExpenses() {}

export async function getLabelSummary(profileId: string) {}
