"use client";

import OnboardingContext from "@/contexts/onboarding-context";
import { useContext } from "react";

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  return context;
}
