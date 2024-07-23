"use client";

import { DashboardProvider } from "@/contexts/dashboard-context";
import { ReactNode } from "react";

export function DashboardWrapper({ children }: { children: ReactNode }) {
  return <DashboardProvider>{children}</DashboardProvider>;
}
