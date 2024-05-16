import { prisma } from "@/prisma/client";

export async function getLabels(profileId?: string, userId?: string) {
  return await prisma.label.findMany({
    where: { profile: { id: profileId, userId: userId } },
  });
}
