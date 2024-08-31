"use server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "./user";
import { Label } from "@prisma/client";
import { AddLabelDTO } from "@/dto/types";
import { ensureAuthenticatedUser } from "./account";
import { FetchingDataError, ProfileRequiredError } from "@/lib/exceptions";

export async function addLabelsFromSystem(systemLabels: AddLabelDTO[]) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    await prisma.label.createMany({
      data: systemLabels.map((sl) => {
        return {
          title: sl.title,
          colorHex: sl.colorHex,
          isActive: true,
          profileId: user.selectedProfile!.id,
        };
      }),
    });
  } catch {
    throw new FetchingDataError();
  }
}

export async function createLabel(label?: AddLabelDTO, labels?: AddLabelDTO[]) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  try {
    if (label) {
      return await prisma.label.create({
        data: {
          profileId: user.selectedProfile.id,
          title: label.title,
          colorHex: label.colorHex,
          isActive: true,
        },
      });
    }

    if (labels) {
      return await prisma.label.createMany({
        data: labels.map((l) => ({
          profileId: user.selectedProfile!.id,
          title: l.title,
          colorHex: l.colorHex,
          isActive: true,
        })),
      });
    }
  } catch {
    throw new FetchingDataError();
  }
}

export async function deleteLabel(labelId: string) {
  await ensureAuthenticatedUser();
  try {
    return await prisma.label.delete({
      where: {
        id: labelId,
      },
    });
  } catch {
    throw new FetchingDataError();
  }
}

export async function getLabelsFromFirstCreatedProfile(): Promise<
  Label[] | null
> {
  await ensureAuthenticatedUser();
  try {
    const firstCreatedProfile = await prisma.profile.findFirst({
      include: {
        Label: true,
      },
    });
    return firstCreatedProfile && firstCreatedProfile?.Label;
  } catch {
    throw new FetchingDataError();
  }
}

export async function hasAnyLabel() {
  const user = await ensureAuthenticatedUser();
  try {
    const labelCount = await prisma.label.count({
      where: {
        profile: {
          userId: user.id,
        },
      },
    });
    return labelCount > 0;
  } catch {
    throw new FetchingDataError();
  }
}
