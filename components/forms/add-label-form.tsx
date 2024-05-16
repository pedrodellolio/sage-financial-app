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
import { AddLabelFormData, addLabelSchema } from "@/schemas/add-label-schema";
import { createLabel } from "@/app/actions/labels";

export default function AddLabelForm(props: React.ComponentProps<"form">) {
  const { data: session } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();

  const form = useForm<AddLabelFormData>({
    resolver: zodResolver(addLabelSchema),
    defaultValues: {
      title: "",
      colorHex: "",
    },
  });

  async function addLabel(data: AddLabelFormData) {
    const profileId = searchParams.get("profile");
    if (profileId) {
      await createLabel(profileId, data);
      router.back();
    }
  }

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(addLabel)}
          className={cn("grid items-start gap-5", props.className)}
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

          <FormField
            control={form.control}
            name="colorHex"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Cor</FormLabel>
                <FormControl>
                  <AdornedInput
                    autoComplete="off"
                    adornment={<Text className="h-5 w-5" />}
                    placeholder="Cor"
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
