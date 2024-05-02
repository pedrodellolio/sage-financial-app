"use client";

import { OptionsProvider } from "@/context/options-context";
import { ReactNode } from "react";

export function OptionsWrapper({ children }: { children: ReactNode }) {
  return <OptionsProvider>{children}</OptionsProvider>;
}
