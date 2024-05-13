import { Profile, Transaction, Type, Wallet } from "@/dto/types";
import { prisma } from "@/prisma/client";
import { AddTransactionDTO } from "./transactions";
import { Prisma } from "@prisma/client";

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
      expensesBrl: wallet?.expensesBrl.toNumber(),
      incomeBrl: wallet?.incomeBrl.toNumber(),
    } as Wallet)
  );
}

export async function updateOrCreateWallet(
  profileId: string,
  t: AddTransactionDTO,
  w: Wallet | null
) {
  const { valueBrl, occurredAt } = t;
  const isExpense = t.type === Type.EXPENSE;

  let expenses = isExpense ? valueBrl : 0;
  let income = !isExpense ? valueBrl : 0;

  if (w) {
    expenses += w.expensesBrl;
    income += w.incomeBrl;
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
