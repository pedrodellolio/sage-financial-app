import { Table as ReactTable } from "@tanstack/react-table";
import { createContext, useContext } from "react";

type DataTableContextType<TData> = ReactTable<TData> | null;

export const DataTableContext = createContext<DataTableContextType<any>>(null);

export const useDataTable = () => {
  return useContext(DataTableContext);
};
