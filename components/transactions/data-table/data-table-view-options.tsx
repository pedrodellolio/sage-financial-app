"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

export function DataTableViewOptions() {
  const router = useRouter();
  const params = useSearchParams();
  const pathname = usePathname();
  
  const handleImportExcel = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("i", "1");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  const handleNewTransaction = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("t", "1");
    router.push(`${pathname}?${newParams.toString()}`);
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <Button
        variant="outline"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={handleImportExcel}
      >
        <Plus className="mr-2 h-4 w-4" />
        Importar Excel
      </Button>
      <Button
        variant="default"
        size="sm"
        className="ml-auto hidden h-8 lg:flex"
        onClick={handleNewTransaction}
      >
        <Plus className="mr-2 h-4 w-4" />
        Novo
      </Button>
    </div>
  );
}
