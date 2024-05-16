"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { Profile } from "@/dto/types";
import { deleteProfile } from "@/app/actions/profile";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface DataTableRowActions {
  data: Profile;
}

export function DataTableRowActions({ data }: DataTableRowActions) {
  const router = useRouter();

  const handleDeleteRow = async (id: string) => {
    await deleteProfile(id);
    router.refresh();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
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
