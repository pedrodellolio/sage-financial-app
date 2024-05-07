"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Transaction } from "@/dto/types";
import { deleteTransaction } from "@/app/actions/transactions";
import { revalidatePath } from "next/cache";

interface DataTableRowActions {
  data: Transaction;
}

export function DataTableRowActions({ data }: DataTableRowActions) {
  const handleDeleteRow = async (id: string) => {
    await deleteTransaction(id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Opções</DropdownMenuLabel>
        {/* <DropdownMenuItem>Ver detalhes</DropdownMenuItem> */}
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem>Editar</DropdownMenuItem> */}
        <DropdownMenuItem
          className="!text-red-500 hover:!bg-red-50"
          onClick={() => handleDeleteRow(data.id)}
        >
          Apagar
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
