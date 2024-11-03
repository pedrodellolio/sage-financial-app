"use server";

import {
  getWalletByMonthAndYear,
  updateOrCreateWallet,
  createWallet,
  updateWallet,
} from "./wallet";
import {
  convertStringToDate,
  currencyStringToTransactionValue,
} from "@/lib/utils";
import { prisma } from "@/lib/prisma";
import { ensureAuthenticatedUser } from "./account";
import { FetchingDataError, ProfileRequiredError } from "@/lib/exceptions";
import { Label, TransactionType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { format } from "date-fns";
import { AddOrUpdateTransactionDTO } from "@/dto/types";

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

export async function getTransactions(
  startDate?: Date,
  endDate?: Date,
  labelsTitle?: string[]
) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    return await prisma.transaction.findMany({
      include: { labels: true },
      where: {
        wallet: {
          profileId: user.selectedProfile.id,
        },
        OR: [
          { labels: { none: {} } },
          { labels: { some: { title: { in: labelsTitle } } } },
        ],
        occurredAt: { lte: endDate, gte: startDate },
      },
    });
  } catch (err) {
    console.error(err);
    throw new FetchingDataError();
  }
}

export async function getTransactionsUniqueDate() {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    const result = await prisma.transaction.findMany({
      where: {
        wallet: { profileId: user.selectedProfile.id }, // Assuming you filter by profile ID
      },
      select: {
        occurredAt: true, // Select only the transaction date
      },
      distinct: ["occurredAt"], // Get distinct values
    });

    const uniqueMonths = [
      ...new Set(result.map((t) => format(t.occurredAt, "MM"))),
    ];

    const uniqueYears = [
      ...new Set(result.map((t) => format(t.occurredAt, "yyyy"))),
    ];

    return {
      months: uniqueMonths,
      years: uniqueYears,
    };
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
  transaction: AddOrUpdateTransactionDTO
) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    const month = transaction.occurredAt.getMonth();
    const year = transaction.occurredAt.getFullYear();
    const currWallet = await getWalletByMonthAndYear(month, year);
    const wallet = await updateOrCreateWallet(transaction, currWallet);

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
  } catch {
    throw new FetchingDataError();
  }
}

export async function createTransactions(
  transactions: AddOrUpdateTransactionDTO[]
) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    //ERRADO POIS ESTÁ FAZENDO EM PARALELO, SEMPRE CRIANDO UMA WALLET
    await Promise.all(
      transactions.map(async (t) => {
        const month = new Date(t.occurredAt).getMonth();
        const year = new Date(t.occurredAt).getFullYear();
        let currWallet = await getWalletByMonthAndYear(month, year);

        if (!currWallet) {
          currWallet = await createWallet(month, year);
        }

        console.log(t.occurredAt);
        await updateWallet(currWallet.id, t.valueBrl, t.type);
        await prisma.transaction.create({
          data: {
            walletId: currWallet.id,
            title: t.title ?? `Movimentação de ${t.occurredAt}`,
            occurredAt: t.occurredAt,
            valueBrl: t.valueBrl,
            type: t.type,
            fileId: t.fileId,
          },
        });
      })
    );
  } catch (err) {
    console.error(err);
    throw new FetchingDataError();
  }
}
