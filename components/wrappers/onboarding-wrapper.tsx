"use client";

import { OnboardingProvider } from "@/contexts/onboarding-context";
import { ReactNode } from "react";

export function OnboardingWrapper({ children }: { children: ReactNode }) {
  return <OnboardingProvider>{children}</OnboardingProvider>;
}
