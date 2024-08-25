"use server";

import { prisma } from "@/lib/prisma";
import { addProfileSchema } from "@/schemas/add-profile-schema";
import { isAuthenticated, updateSelectedProfile } from "./user";
import { redirect } from "next/navigation";

export interface AddOrUpdateDTO {
  title: string;
}

export async function getProfiles() {
  const user = await isAuthenticated();
  if (!user) throw new Error("You must be signed in to perform this action");

  return await prisma.profile.findMany({
    where: {
      userId: user.id,
    },
  });
}

export async function getFirstProfile() {
  const user = await isAuthenticated();
  if (!user) throw new Error("You must be signed in to perform this action");
  return await prisma.profile.findFirst({
    where: {
      userId: user.id,
    },
  });
}

export async function createOrUpdateProfile(
  profile: AddOrUpdateDTO,
  profileId?: string
) {
  const user = await isAuthenticated();
  if (!user) throw new Error("You must be signed in to perform this action");

  return profileId
    ? await prisma.profile.update({
        data: { title: profile.title },
        where: { id: profileId },
      })
    : await prisma.profile.create({
        data: { userId: user.id, title: profile.title, isActive: true },
      });
}

export async function deleteProfile(profileId: string) {
  return await prisma.profile.delete({
    where: {
      id: profileId,
    },
  });
}

export async function parseAndCreateOrUpdateProfile(
  formData: FormData,
  profileId?: string
) {
  const validatedFields = addProfileSchema.safeParse(
    Object.fromEntries(formData)
  );

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    const profile = await createOrUpdateProfile(
      { title: validatedFields.data.title },
      profileId
    );
    await updateSelectedProfile(profile.id);
  } catch (err) {
    console.error(err);
    return {
      errors: {
        title: ["Ocorreu um erro ao criar o perfil"],
      },
    };
  }
  redirect("/onboarding/label");
}

export async function hasAnyProfile() {
  const user = await isAuthenticated();
  if (!user) throw new Error("Faça login para realizar essa ação");

  return (await prisma.profile.count()) > 0;
}
