"use server";

import { Label, Profile, Transaction, TransactionType } from "@/dto/types";
import { prisma } from "@/prisma/client";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";
import { getWalletByMonthAndYear, updateOrCreateWallet } from "./wallet";

export interface AddTransactionDTO {
  title: string;
  type: TransactionType;
  valueBrl: number;
  occurredAt: Date;
  labels: Label[];
}

export async function getTransactions(
  profileId: string,
  startDate?: Date,
  endDate?: Date
) {
  noStore;

  const transactions = await prisma.transaction.findMany({
    include: { labels: true },
    where: {
      wallet: {
        profileId: profileId,
      },
      occurredAt: { lte: endDate, gte: startDate },
    },
  });

  return transactions.map((t) => {
    return {
      ...t,
      valueBrl: t.valueBrl.toNumber(),
      type: t.type as TransactionType,
    } as Transaction;
  });
}

export async function deleteTransaction(id?: string) {
  await prisma.transaction.delete({
    where: { id: id },
  });
  revalidatePath("/app/(protected)/transactions", "page");
}

export async function createTransaction(
  profileId: string,
  transaction: AddTransactionDTO
) {
  const month = transaction.occurredAt.getMonth();
  const year = transaction.occurredAt.getFullYear();
  const currWallet = await getWalletByMonthAndYear(profileId, month, year);

  const wallet = await updateOrCreateWallet(profileId, transaction, currWallet);

  await prisma.transaction.create({
    data: {
      walletId: wallet.id,
      title: transaction.title,
      valueBrl: transaction.valueBrl,
      type: transaction.type,
      occurredAt: transaction.occurredAt,
      labels: {
        connect: transaction.labels,
      },
    },
  });
  revalidatePath("/app/(protected)/transactions", "page");
}
