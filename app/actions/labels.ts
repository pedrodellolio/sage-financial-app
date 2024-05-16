"use server";
import { prisma } from "@/prisma/client";

export interface AddLabelDTO {
  title: string;
  colorHex: string;
}

export async function getLabels(profileId?: string) {
  return await prisma.label.findMany({
    where: { profile: { id: profileId } },
  });
}

export async function createLabel(profileId: string, label: AddLabelDTO) {
  return await prisma.label.create({
    data: {
      profileId: profileId,
      title: label.title,
      colorHex: label.colorHex,
      isActive: true,
    },
  });
}

export async function deleteLabel(labelId: string) {
  return await prisma.label.delete({
    where: {
      id: labelId,
    },
  });
}
