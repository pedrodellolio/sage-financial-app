"use client";

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useState,
} from "react";

interface ImportTransactionsContextData {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

const ImportTransactionsContext = createContext<ImportTransactionsContextData>(
  {} as ImportTransactionsContextData
);
export const ImportTransactionsProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <ImportTransactionsContext.Provider
      value={{
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </ImportTransactionsContext.Provider>
  );
};
export default ImportTransactionsContext;
