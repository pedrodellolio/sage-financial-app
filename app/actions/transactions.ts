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
import { format } from "date-fns";

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
        labels: {
          some: {
            title: { in: labelsTitle },
          },
        },
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

export async function createTransaction(transaction: AddTransactionDTO) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    const month = transaction.occurredAt.getMonth();
    const year = transaction.occurredAt.getFullYear();
    const currWallet = await getWalletByMonthAndYear(
      user.selectedProfile.id,
      month,
      year
    );
    const wallet = await updateOrCreateWallet(
      user.selectedProfile.id,
      transaction,
      currWallet
    );

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
