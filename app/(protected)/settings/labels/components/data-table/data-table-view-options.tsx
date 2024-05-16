"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DataTableViewOptions() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isAddLabelDialogOpen = !!searchParams.get("l");

  const handleOpenDialog = () => {
    if (!isAddLabelDialogOpen) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.set("l", "1");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
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
