import { prisma } from "@/lib/prisma";
import { AddTransactionDTO } from "./transactions";
import { TransactionType, Wallet } from "@prisma/client";

export async function getWalletByMonthAndYear(
  profileId: string,
  month: number,
  year: number
) {
  const wallet = await prisma.wallet.findFirst({
    where: {
      profileId: profileId,
      month: month,
      year: year,
    },
  });
  return (
    wallet &&
    ({
      ...wallet,
      expensesBrl: wallet?.expensesBrl,
      incomeBrl: wallet?.incomeBrl,
    } as Wallet)
  );
}

export async function updateOrCreateWallet(
  profileId: string,
  t: AddTransactionDTO,
  w: Wallet | null
) {
  const { valueBrl, occurredAt } = t;
  const isExpense = t.type === TransactionType.EXPENSE;

  let expenses = isExpense ? valueBrl : 0;
  let income = !isExpense ? valueBrl : 0;

  if (w) {
    expenses += w.expensesBrl.toNumber();
    income += w.incomeBrl.toNumber();
  }

  if (!w) {
    return await prisma.wallet.create({
      data: {
        profileId: profileId,
        expensesBrl: expenses,
        incomeBrl: income,
        month: occurredAt.getMonth(),
        year: occurredAt.getFullYear(),
      },
    });
  }
  return await prisma.wallet.update({
    data: {
      expensesBrl: expenses,
      incomeBrl: income,
      month: occurredAt.getMonth(),
      year: occurredAt.getFullYear(),
    },
    where: {
      id: w.id,
    },
  });
}
