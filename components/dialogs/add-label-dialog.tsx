"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
} from "@/components/ui/drawer";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import AddLabelForm from "../forms/add-label-form";

interface Props {
  open: boolean;
}

export default function AddLabelDialog(props: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen) {
      const current = new URLSearchParams(Array.from(searchParams.entries()));
      current.delete("l");
      const search = current.toString();
      const query = search ? `?${search}` : "";
      router.push(`${pathname}${query}`);
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={props.open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[460px]">
          <DialogHeader>
            <DialogTitle>Adicionar categoria</DialogTitle>
            <DialogDescription>
              Crie uma categoria de movimentações.
            </DialogDescription>
          </DialogHeader>
          <AddLabelForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={props.open}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DialogTitle>Adicionar categoria</DialogTitle>
          <DialogDescription>
            Crie uma categoria de movimentações.
          </DialogDescription>
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
