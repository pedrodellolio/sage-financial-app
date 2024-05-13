import { prisma } from "@/prisma/client";

export async function getLabels(profileId?: string) {
  return await prisma.label.findMany({
    where: { profile: { id: profileId } },
  });
}
