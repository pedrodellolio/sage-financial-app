"use server";

import { getWalletByMonthAndYear, updateOrCreateWallet } from "./wallet";
import {
  convertStringToDate,
  currencyStringToTransactionValue,
  isValidDate,
} from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { ensureAuthenticatedUser } from "./account";
import { FetchingDataError, ProfileRequiredError } from "@/lib/exceptions";
import { Label, Prisma, TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface MappedTransaction {
  fileId: string;
  title: string;
  valueBrl: string;
  occurredAt: string;
}

export interface AddTransactionDTO {
  title: string;
  type: TransactionType;
  valueBrl: number;
  occurredAt: Date;
  labels: Label[];
}

export async function getTransactions(startDate?: Date, endDate?: Date) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    return await prisma.transaction.findMany({
      include: { labels: true },
      where: {
        wallet: {
          profileId: user.selectedProfile.id,
        },
        occurredAt: { lte: endDate, gte: startDate },
      },
    });
  } catch {
    throw new FetchingDataError();
  }
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
}

export async function createTransactions(
  profileId: string,
  transactions: MappedTransaction[]
) {
  // const month = transaction.occurredAt.getMonth();
  // const year = transaction.occurredAt.getFullYear();
  // const currWallet = await getWalletByMonthAndYear(profileId, month, year);

  // const wallet = await updateOrCreateWallet(profileId, transaction, currWallet);

  await prisma.transaction.createMany({
    data: transactions.map((t) => {
      const { valueBrl, type } = currencyStringToTransactionValue(t.valueBrl);
      return {
        walletId: "clw9pigra000fgurc5orawod3",
        title: t.title ?? `Movimentação de ${t.occurredAt}`,
        occurredAt: isValidDate(t.occurredAt)
          ? convertStringToDate(t.occurredAt)
          : new Date(),
        valueBrl: valueBrl,
        type: type,
        fileId: t.fileId,
      };
    }),
  });
}
