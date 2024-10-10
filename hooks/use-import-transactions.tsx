"use client";

import ImportTransactionsContext from "@/contexts/import-transactions-context";
import { useContext } from "react";

export function useImportTransactions() {
  const context = useContext(ImportTransactionsContext);
  return context;
}
