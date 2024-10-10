import React from "react";
import { Button } from "../ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Column } from "@tanstack/react-table";

interface Props<T> {
  column: Column<T>;
  title: string;
}

export default function SortingButton<T>({ column, title }: Props<T>) {
  const isSorted = column.getIsSorted();
  return (
    <Button
      variant="ghost"
      className="text-xs p-0 hover:bg-transparent"
      onClick={() => column.toggleSorting(isSorted === "asc")}
    >
      {title}
      {isSorted === "asc" ? (
        <ChevronUp className="ml-2 h-3 w-3" />
      ) : (
        isSorted === "desc" && <ChevronDown className="ml-2 h-3 w-3" />
      )}
    </Button>
  );
}
