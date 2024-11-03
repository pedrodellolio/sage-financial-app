"use server";
import { prisma } from "@/lib/prisma";
import { ensureAuthenticatedUser } from "./account";
import { ProfileRequiredError } from "@/lib/exceptions";

export interface AddFileDTO {
  name: string;
}

export async function getFiles(profileId?: string) {
  return await prisma.file.findMany({
    where: { profile: { id: profileId } },
  });
}

export async function createFiles(files: AddFileDTO[]) {
  const user = await ensureAuthenticatedUser();
  if (!user.selectedProfile) throw new ProfileRequiredError();

  return await prisma.file.createManyAndReturn({
    data: files.map((f) => {
      return { profileId: user.selectedProfile.id, name: f.name };
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
