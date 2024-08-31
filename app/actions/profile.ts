"use server";

import { prisma } from "@/lib/prisma";
import { updateSelectedProfile } from "./user";
import { FetchingDataError } from "@/lib/exceptions";
import { ensureAuthenticatedUser } from "./account";

export interface AddOrUpdateDTO {
  title: string;
}

export async function getProfiles() {
  const user = await ensureAuthenticatedUser();
  try {
    return await prisma.profile.findMany({
      where: {
        userId: user.id,
      },
    });
  } catch {
    throw new FetchingDataError();
  }
}

export async function getFirstProfile() {
  const user = await ensureAuthenticatedUser();
  try {
    return await prisma.profile.findFirst({
      where: {
        userId: user.id,
      },
    });
  } catch {
    throw new FetchingDataError();
  }
}

export async function createOrUpdateProfile(
  profile: AddOrUpdateDTO,
  profileId?: string
) {
  const user = await ensureAuthenticatedUser();
  try {
    return profileId
      ? await prisma.profile.update({
          data: { title: profile.title },
          where: { id: profileId },
        })
      : await prisma.profile.create({
          data: { userId: user.id, title: profile.title, isActive: true },
        });
  } catch {
    throw new FetchingDataError();
  }
}

export async function deleteProfile(profileId: string) {
  await ensureAuthenticatedUser();
  try {
    return await prisma.profile.delete({
      where: {
        id: profileId,
      },
    });
  } catch {
    throw new FetchingDataError();
  }
}

export async function addOrUpdateProfile(title: string, profileId?: string) {
  await ensureAuthenticatedUser();
  try {
    const profile = await createOrUpdateProfile({ title }, profileId);
    await updateSelectedProfile(profile.id);
  } catch {
    throw new FetchingDataError();
  }
}

export async function hasAnyProfile() {
  const user = await ensureAuthenticatedUser();
  try {
    const profileCount = await prisma.profile.count({
      where: { userId: user.id },
    });
    return profileCount > 0;
  } catch {
    throw new FetchingDataError();
  }
}
