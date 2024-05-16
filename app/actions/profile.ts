import { prisma } from "@/prisma/client";

export async function getProfiles(userId: string) {
  return await prisma.profile.findMany({
    where: {
      userId: userId,
    },
  });
}
