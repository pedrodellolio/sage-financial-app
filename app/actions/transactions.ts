"use server";

import { Label, Transaction, Type } from "@/dto/types";
import { prisma } from "@/prisma/client";
import { revalidatePath, unstable_noStore as noStore } from "next/cache";

interface AddTransactionDTO {
  profileId: string;
  title: string;
  type: Type;
  valueBrl: number;
  occurredAt: Date;
  labels: Label[];
}

export async function getTransactions(
  profileId: string,
  startDate?: Date,
  endDate?: Date
): Promise<Transaction[]> {
  noStore;

  const transactions = await prisma.transaction.findMany({
    include: { labels: true },
    where: {
      profile: { id: profileId },
      occurredAt: { lte: endDate, gte: startDate },
    },
  });

  return transactions.map((t) => {
    return {
      ...t,
      valueBrl: t.valueBrl.toNumber(),
      type: t.type as Type,
    };
  });
}

export async function deleteTransaction(id?: string) {
  await prisma.transaction.delete({
    where: { id: id },
  });
  revalidatePath("/app/(protected)/transactions", "page");
}

export async function createTransaction(transaction: AddTransactionDTO) {
  await prisma.transaction.create({
    data: {
      profileId: transaction.profileId,
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
