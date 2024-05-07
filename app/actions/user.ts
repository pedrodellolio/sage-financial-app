"use server";

import { prisma } from "@/prisma/client";

export async function getUser(userId?: string) {
  return await prisma.user.findUnique({
    where: {
      id: userId,
    },
    include: {
      selectedProfile: true,
    },
  });
}

export async function updateSelectedProfile(
  userId?: string,
  profileId?: string
) {
  return await prisma.user.update({
    where: {
      id: userId,
    },
    data: {
      selectedProfileId: profileId,
    },
    include: {
      selectedProfile: true,
    },
  });
}
