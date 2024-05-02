"use client";

import OptionsContext from "@/context/options-context";
import { useContext } from "react";

export function useOptions() {
  const context = useContext(OptionsContext);
  return context;
}
