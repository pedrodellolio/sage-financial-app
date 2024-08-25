"use server";
import { prisma } from "@/lib/prisma";
import { isAuthenticated } from "./user";
import { SystemLabel } from "@prisma/client";

export interface AddLabelDTO {
  title: string;
  colorHex: string;
}

export async function createLabelsFromSystem(systemLabels: SystemLabel[]) {
  const user = await isAuthenticated();
  if (!user) throw new Error("Faça login para realizar essa ação");
  if (!user.selectedProfile) throw new Error("Perfil não selecionado");

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
}

export async function createLabel(label?: AddLabelDTO, labels?: AddLabelDTO[]) {
  const user = await isAuthenticated();
  if (!user) throw new Error("Faça login para realizar essa ação");
  if (!user.selectedProfile) throw new Error("Perfil não selecionado");

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

  throw new Error();
}

export async function deleteLabel(labelId: string) {
  return await prisma.label.delete({
    where: {
      id: labelId,
    },
  });
}

export async function hasAnyLabel() {
  const user = await isAuthenticated();
  if (!user) throw new Error("Faça login para realizar essa ação");

  return (await prisma.label.count()) > 0;
}
