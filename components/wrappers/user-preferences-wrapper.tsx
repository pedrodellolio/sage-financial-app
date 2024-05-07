"use client";

import { UserPreferencesProvider } from "@/contexts/user-preferences-context";
import { ReactNode } from "react";

export function UserPreferencesWrapper({ children }: { children: ReactNode }) {
  return <UserPreferencesProvider>{children}</UserPreferencesProvider>;
}
