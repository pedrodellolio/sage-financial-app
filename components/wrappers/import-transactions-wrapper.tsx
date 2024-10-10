"use client";

import { ImportTransactionsProvider } from "@/contexts/import-transactions-context";
import { ReactNode } from "react";

export function ImportTransactionsWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return <ImportTransactionsProvider>{children}</ImportTransactionsProvider>;
}
