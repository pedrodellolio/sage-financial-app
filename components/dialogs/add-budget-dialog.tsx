"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import AddTransactionForm from "../forms/add-transaction-form";
import { useRouter } from "next/navigation";
import { Label } from "@/dto/types";
import AddBudgetForm from "../forms/add-budget-form";

interface Props {
  open: boolean;
  labels: Label[];
}

export default function AddBudgetDialog(props: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) router.push(`/budget`);
  };

  if (isDesktop) {
    return (
      <Dialog open={props.open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[510px]">
          <DialogHeader>
            <DialogTitle>Criar Orçamento</DialogTitle>
            <DialogDescription>
              Defina um orçamento para uma label.
            </DialogDescription>
          </DialogHeader>
          <AddBudgetForm labels={props.labels} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props.open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Criar Orçamento</DrawerTitle>
          <DrawerDescription>
            Defina um orçamento para uma label.
          </DrawerDescription>
        </DrawerHeader>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
