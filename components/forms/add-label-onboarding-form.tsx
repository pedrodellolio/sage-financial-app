"use client";

import { Button } from "@/components/ui/button";
import SuggestionLabelList from "@/app/(protected)/onboarding/components/suggestion-label-list";
import { useRouter } from "next/navigation";
import { createLabelsFromSystem } from "@/app/actions/labels";
import { useState } from "react";
import { SystemLabel } from "@prisma/client";
import { useOnboarding } from "@/hooks/use-onboarding";

export default function AddLabelOnboardingForm() {
  const router = useRouter();
  const { nextStep, previousStep } = useOnboarding();
  const [selected, setSelected] = useState<SystemLabel[]>([]);

  const handleAddLabels = async () => {
    await createLabelsFromSystem(selected);
    nextStep();
    router.replace("/onboarding/success");
  };

  const handlePreviousStep = () => {
    previousStep();
    router.back();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <SuggestionLabelList selected={selected} setSelected={setSelected} />
      <small className="text-center text-muted-foreground/80 mt-2">
        É possível criar ou adicionar novas categorias a qualquer momento.
      </small>

      <div className="flex flex-row items-center justify-between mt-10 w-full">
        <Button onClick={() => handlePreviousStep} variant={"outline"}>
          Voltar
        </Button>
        <Button onClick={handleAddLabels}>Finalizar</Button>
      </div>
    </div>
  );
}
