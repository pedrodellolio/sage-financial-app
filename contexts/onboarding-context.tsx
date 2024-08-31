"use client";

import LabelStep from "@/app/(protected)/onboarding/label/page";
import ProfileStep from "@/app/(protected)/onboarding/profile/page";
import { ReactNode, createContext, useState } from "react";

interface OnboardingContextData {
  currentStep: number;
  nextStep: () => void;
  previousStep: () => void;
}

const OnboardingContext = createContext<OnboardingContextData>(
  {} as OnboardingContextData
);

export const STEPS = [
  { node: <ProfileStep /> },
  { node: <LabelStep /> },
];
const INITIAL_STEP = 1;

export const OnboardingProvider = ({ children }: { children: ReactNode }) => {
  const [currentStep, setCurrentStep] = useState(INITIAL_STEP);

  const nextStep = () =>
    setCurrentStep((prevState) => {
      return prevState < STEPS.length ? prevState + 1 : prevState;
    });

  const previousStep = () =>
    setCurrentStep((prevState) => {
      return prevState > INITIAL_STEP ? prevState - 1 : prevState;
    });

  return (
    <OnboardingContext.Provider
      value={{
        currentStep,
        nextStep,
        previousStep,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
export default OnboardingContext;
