"use client";

import { useOnboarding } from "@/hooks/use-onboarding";
import { STEPS } from "@/contexts/onboarding-context";

type Props = {};

export default function OnboardingSteps({}: Props) {
  const { currentStep } = useOnboarding();
  return (
    <div className="flex flex-row gap-2">
      {STEPS.map((_, i) => (
        <div
          key={i}
          className={`h-2 rounded-full ${
            i === currentStep - 1 ? "bg-primary w-6" : "bg-primary/50 w-2"
          }`}
        ></div>
      ))}
    </div>
  );
}
