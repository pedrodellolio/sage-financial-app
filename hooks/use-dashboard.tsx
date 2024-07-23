"use client";

import DashboardContext from "@/contexts/dashboard-context";
import { useContext } from "react";

export function useDashboard() {
  const context = useContext(DashboardContext);
  return context;
}
