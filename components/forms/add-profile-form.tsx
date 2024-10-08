"use client";

import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { Text } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { AdornedInput } from "../adorned-input";
import { useSession } from "next-auth/react";
import { createProfile } from "@/app/actions/profile";
import {
  AddProfileFormData,
  addProfileSchema,
} from "@/schemas/add-profile-schema";
import { useUser } from "@/hooks/use-user";

interface Props {
  onboarding?: boolean;
}

export default function AddProfileForm(
  props: React.ComponentProps<"form"> & Props
) {
  const { profile, setProfile } = useUser();
  const { data: session } = useSession();

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const form = useForm<AddProfileFormData>({
    resolver: zodResolver(addProfileSchema),
    defaultValues: {
      title: "",
    },
  });

  async function addProfile(data: AddProfileFormData) {
    const userId = session?.user.id;
    if (userId) {
      const createdProfile = await createProfile(userId, data);
      //set selected profile if selected profile is null
      if (props.onboarding && !profile) {
        setProfile(createdProfile);
        callbackUrl && router.replace(callbackUrl);
      } else {
        router.back();
      }
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addProfile)}
          className={cn("grid items-start gap-5 w-full", props.className)}
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Título</FormLabel>
                <FormControl>
                  <AdornedInput
                    autoComplete="off"
                    adornment={<Text className="h-5 w-5" />}
                    placeholder="Título"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Adicionar</Button>
        </form>
      </Form>
    </>
  );
}
