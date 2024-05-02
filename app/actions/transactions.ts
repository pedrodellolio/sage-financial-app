import { prisma } from "@/prisma/client";

export async function getTransactions(profileTitle?: string) {
  return await prisma.transaction.findMany({
    where: { profile: { title: profileTitle } },
  });
}
