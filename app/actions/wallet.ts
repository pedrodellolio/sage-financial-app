import { prisma } from "@/lib/prisma";
import { AddTransactionDTO } from "./transactions";
import { TransactionType, Wallet } from "@prisma/client";
import { ensureAuthenticatedUser } from "./account";
import { FetchingDataError, ProfileRequiredError } from "@/lib/exceptions";
import { AddOrUpdateTransactionDTO } from "@/dto/types";

export async function getWalletByMonthAndYear(month: number, year: number) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  const wallet = await prisma.wallet.findFirst({
    where: {
      profileId: user.selectedProfile.id,
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

export async function updateWallet(
  walletId: string,
  valueBrl: number,
  type: TransactionType
) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    const updateData: any = {};

    if (type === TransactionType.EXPENSE) {
      updateData.expensesBrl = { increment: valueBrl };
    } else if (type === TransactionType.INCOME) {
      updateData.incomeBrl = { increment: valueBrl };
    }

    await prisma.wallet.update({
      data: updateData,
      where: {
        id: walletId,
      },
    });
  } catch (err) {
    console.error(err);
    throw new FetchingDataError();
  }
}

export async function createWallet(month: number, year: number) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    return await prisma.wallet.create({
      data: {
        profileId: user.selectedProfile.id,
        expensesBrl: 0,
        incomeBrl: 0,
        month,
        year,
      },
    });
  } catch (err) {
    console.error(err);
    throw new FetchingDataError();
  }
}

export async function updateOrCreateWallet(
  transaction: AddOrUpdateTransactionDTO,
  wallet: Wallet | null
) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    const { valueBrl, occurredAt } = transaction;
    const isExpense = transaction.type === TransactionType.EXPENSE;

    let expenses = isExpense ? valueBrl : 0;
    let income = !isExpense ? valueBrl : 0;

    if (wallet) {
      expenses += wallet.expensesBrl.toNumber();
      income += wallet.incomeBrl.toNumber();
    }

    if (!wallet) {
      return await prisma.wallet.create({
        data: {
          profileId: user.selectedProfile.id,
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
        id: wallet.id,
      },
    });
  } catch (err) {
    console.error(err);
    throw new FetchingDataError();
  }
}
