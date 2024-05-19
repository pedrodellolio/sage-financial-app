"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table } from "@tanstack/react-table";
import { SlidersHorizontal } from "lucide-react";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

interface DataTableViewOptionsProps<TData> {
  table: Table<TData>;
}

export function DataTableViewOptions<TData>({
  table,
}: DataTableViewOptionsProps<TData>) {
  const router = useRouter();
  const params = useSearchParams();

  const isAddTransactionDialogOpen = !!params.get("t");
  const isImportFilesDialogOpen = !!params.get("i");

  const handleOpenDialog = () => {
    if (!isAddTransactionDialogOpen) {
      router.push("?t=" + 1);
    }

    if (!isImportFilesDialogOpen) {
      router.push("?i=" + 1);
    }
  };
  return (
    <div className="flex flex-row items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Colunas
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuLabel>Ver colunas</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {table
            .getAllColumns()
            .filter(
              (column) =>
                typeof column.accessorFn !== "undefined" && column.getCanHide()
            )
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value) => column.toggleVisibility(!!value)}
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>

      <Button
        variant="default"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={handleOpenDialog}
      >
        <Plus className="mr-2 h-4 w-4" />
        Importar Excel
      </Button>
      <Button
        variant="default"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={handleOpenDialog}
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo
      </Button>
    </div>
  );
}
