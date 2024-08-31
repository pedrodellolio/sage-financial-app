"use client";

import { Button } from "@/components/ui/button";
import SuggestionLabelList from "@/app/(protected)/onboarding/components/suggestion-label-list";
import { useRouter } from "next/navigation";
import { addLabelsFromSystem } from "@/app/actions/labels";
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
import { LoadingButton } from "../loading-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { AddLabelsFormData, addLabelsSchema } from "@/schemas/add-label-schema";
import { AddLabelDTO } from "@/dto/types";
import { Label, SystemLabel } from "@prisma/client";

interface Props {
  data: Label[] | null;
}

export default function AddLabelOnboardingForm(props: Props) {
  const router = useRouter();
  const { nextStep, previousStep } = useOnboarding();
  const form = useForm<AddLabelsFormData>({
    resolver: zodResolver(addLabelsSchema),
    defaultValues: { labels: props.data ?? [] },
  });

  const onSubmit = async (values: AddLabelsFormData) => {
    await addLabelsFromSystem(values.labels);
    nextStep();
    router.push("/onboarding/success");
  };

  const handlePreviousStep = () => {
    previousStep();
    router.back();
  };

  const handleAddLabel = (label: SystemLabel) => {
    const currentLabels = form.getValues("labels");

    const isAlreadySelected = currentLabels.some(
      (existingLabel) => existingLabel.title === label.title
    );

    if (isAlreadySelected) {
      form.setValue(
        "labels",
        currentLabels.filter(
          (existingLabel) => existingLabel.title !== label.title
        )
      );
    } else {
      form.setValue("labels", [
        ...currentLabels,
        { title: label.title, colorHex: label.colorHex } as AddLabelDTO,
      ]);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-6 h-full"
      >
        <FormField
          control={form.control}
          name="labels"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <SuggestionLabelList
                  selected={field.value}
                  onLabelClick={handleAddLabel}
                />
              </FormControl>
              <FormDescription>
                É possível criar ou adicionar novas categorias a qualquer
                momento.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex flex-row items-center justify-between">
          <Button
            onClick={handlePreviousStep}
            type="button"
            variant={"outline"}
          >
            Voltar
          </Button>
          <LoadingButton isLoading={form.formState.isSubmitting}>
            Finalizar
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
}
