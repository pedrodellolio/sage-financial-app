"use client";

import UserContext from "@/contexts/user-context";
import { useContext } from "react";

export function useUser() {
  const context = useContext(UserContext);
  return context;
}
