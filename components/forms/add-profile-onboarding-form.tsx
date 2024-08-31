"use client";

import { Input } from "@/components/ui/input";
import { addOrUpdateProfile } from "@/app/actions/profile";
import { Profile } from "@prisma/client";
import { LoadingButton } from "../loading-button";
import { useForm } from "react-hook-form";
import {
  AddProfileFormData,
  addProfileSchema,
} from "@/schemas/add-profile-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOnboarding } from "@/hooks/use-onboarding";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useRouter } from "next/navigation";

interface Props {
  data: Profile | null;
}

export default function AddProfileOnboardingForm(
  props: Props & React.ComponentProps<"form">
) {
  const router = useRouter();
  const { nextStep } = useOnboarding();
  const form = useForm<AddProfileFormData>({
    resolver: zodResolver(addProfileSchema),
    defaultValues: { title: props.data ? props.data.title : "" },
  });

  const onSubmit = async (values: AddProfileFormData) => {
    await addOrUpdateProfile(values.title, props.data?.id);
    nextStep();
    router.push("/onboarding/label");
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 h-full mt-12"
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Perfil</FormLabel>
              <FormControl>
                <Input
                  placeholder="Ex: Pessoal, Trabalho, Família..."
                  {...field}
                />
              </FormControl>
              <FormDescription>
                O nome pode ser alterado a qualquer momento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center justify-end">
          <LoadingButton isLoading={form.formState.isSubmitting}>
            Continuar
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
