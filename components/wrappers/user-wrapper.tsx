"use client";

import { UserProvider } from "@/contexts/user-context";
import { ReactNode } from "react";

export function UserWrapper({ children }: { children: ReactNode }) {
  return <UserProvider>{children}</UserProvider>;
}
