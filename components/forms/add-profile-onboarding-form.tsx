"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { parseAndCreateProfile } from "@/app/actions/profile";
import { useState } from "react";
import { useOnboarding } from "@/hooks/use-onboarding";

export default function AddProfileOnboardingForm(
  props: React.ComponentProps<"form">
) {
  const { nextStep } = useOnboarding();

  const [errors, setErrors] = useState<{
    title?: string[] | undefined;
  }>();

  const onCreate = async (formData: FormData) => {
    const res = await parseAndCreateProfile(formData);
    nextStep();
    setErrors(res.errors);
  };

  return (
    <form
      action={onCreate}
      className={cn("grid items-start gap-5", props.className)}
    >
      <div className="grid gap-6">
        <div className="grid gap-2">
          <Label htmlFor="title">Perfil</Label>
          <Input
            autoComplete="off"
            name="title"
            type="text"
            placeholder="Ex: Pessoal, Trabalho, Família..."
            required
          />
          <small className="text-muted-foreground">
            O nome pode ser alterado a qualquer momento.
          </small>

          {errors?.title?.map((error, i) => (
            <p key={i} aria-live="polite">
              {error}
            </p>
          ))}
        </div>
        <div className="flex flex-row items-center justify-end">
          <SubmitButton />
        </div>
      </div>
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button disabled={pending} type="submit">
      {pending ? "Criando..." : "Continuar"}
    </Button>
  );
}
