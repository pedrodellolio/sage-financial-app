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

interface Props {
  open: boolean;
  labels: Label[];
}

export default function AddTransactionDialog(props: Props) {
  const router = useRouter();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen)
      router.push(`/transactions`);
  };

  if (isDesktop) {
    return (
      <Dialog open={props.open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Adicionar transação</DialogTitle>
            <DialogDescription>
              Registre uma transação bancária.
            </DialogDescription>
          </DialogHeader>
          <AddTransactionForm labels={props.labels} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props.open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Adicionar transação</DrawerTitle>
          <DrawerDescription>
            Registre uma transação bancária.
          </DrawerDescription>
        </DrawerHeader>
        <AddTransactionForm labels={props.labels} />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
