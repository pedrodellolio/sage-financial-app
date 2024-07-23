"use server";
import { prisma } from "@/lib/prisma";

export interface AddFileDTO {
  name: string;
}

export async function getFiles(profileId?: string) {
  return await prisma.file.findMany({
    where: { profile: { id: profileId } },
  });
}

export async function createFiles(profileId: string, files: AddFileDTO[]) {
  return await prisma.file.createManyAndReturn({
    data: files.map((f) => {
      return { profileId, name: f.name };
    }),
  });
}

export async function deleteLabel(fileId: string) {
  return await prisma.file.delete({
    where: {
      id: fileId,
    },
  });
}
