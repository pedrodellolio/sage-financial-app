import { prisma } from "@/prisma/client";

export async function getLabels(profileTitle?: string) {
  return await prisma.label.findMany({
    where: { profile: { title: profileTitle } },
  });
}
