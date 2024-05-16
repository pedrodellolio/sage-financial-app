"use server";

import { prisma } from "@/prisma/client";

export interface AddProfileDTO {
  title: string;
}

export async function getProfiles(userId: string) {
  return await prisma.profile.findMany({
    where: {
      userId: userId,
    },
  });
}

export async function createProfile(userId: string, profile: AddProfileDTO) {
  return await prisma.profile.create({
    data: {
      userId: userId,
      title: profile.title,
      isActive: true,
    },
  });
}

export async function deleteProfile(profileId: string) {
  return await prisma.profile.delete({
    where: {
      id: profileId,
    },
  });
}
