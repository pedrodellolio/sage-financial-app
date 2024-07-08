"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

interface Props {
  creating?: boolean;
}

export default function BudgetCard({ creating }: Props) {
  const router = useRouter();
  const params = useSearchParams();

  const isAddBudgetDialogOpen = !!params.get("b");

  const handleOpenDialog = () => {
    if (!isAddBudgetDialogOpen) {
      router.push("?b=" + 1);
    }
  };

  return (
    <>
      {creating ? (
        <div
          onClick={handleOpenDialog}
          className="cursor-pointer border-2 border-dashed rounded-md p-6 flex justify-center items-center hover:outline outline-2 outline-primary hover:text-primary"
        >
          <Plus />
        </div>
      ) : (
        <div className="border rounded-md p-6">
          <div className="flex flex-row items-center justify-between mb-4">
            <div className="flex flex-row items-center gap-4">
              <Avatar>
                <AvatarFallback>R</AvatarFallback>
              </Avatar>
              <h3>Roupa</h3>
            </div>
            <p className="text-md font-semibold">
              R$400,00{" "}
              <span className="text-muted-foreground font-normal">
                restantes
              </span>
            </p>
          </div>
          <div>
            <Progress value={50} />
            <p className="text-muted-foreground text-sm mt-1">
              R$400,00 de R$800,00
            </p>
          </div>
        </div>
      )}
    </>
  );
}
