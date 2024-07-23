"use server";

import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";

export async function isAuthenticated() {
  const session = await getServerSession(authOptions);
  return session?.user;
}

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

export async function updateSelectedProfile(profileId?: string) {
  const user = await isAuthenticated();
  if (!user) throw new Error("You must be signed in to perform this action");

  return await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      selectedProfileId: profileId,
    },
    include: {
      selectedProfile: true,
    },
  });
}
