"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

export function DataTableViewOptions() {
  const router = useRouter();
  const params = useSearchParams();

  const isAddProfileDialogOpen = !!params.get("p");

  const handleOpenDialog = () => {
    if (!isAddProfileDialogOpen) {
      router.push("?p=" + 1);
    }
  };

  return (
    <div className="flex flex-row items-center gap-4">
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
