"use client";

import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Filter, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface LabelFilterComboBoxProps {
  data: Label[];
  queryKey: string;
  selected?: Label;
}

interface LabelListProps {
  setOpen: (open: boolean) => void;
  data: Label[];
  queryKey: string;
}

export default function LabelFilterComboBox({
  data,
  queryKey,
  selected,
}: LabelFilterComboBoxProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [open, setOpen] = useState(false);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      if (value) {
        params.set(name, value);
      } else {
        params.delete(name);
      }
      return params.toString();
    },
    [searchParams]
  );

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size={"sm"}
            variant="outline"
            className="w-[150px] justify-between text-muted-foreground relative"
          >
            <div className="flex items-center">
              <Filter className="mr-2 w-3 h-3" />
              {selected ? <>{selected.title}</> : <>{"Categoria"}</>}
            </div>

            {selected && (
              <div
                className="ml-2"
                onClick={(e) => {
                  e.stopPropagation();
                  router.push(pathname + "?" + createQueryString(queryKey, ""));
                }}
              >
                <X className="w-4 h-4 cursor-pointer text-muted-foreground hover:bg-muted-foreground/15 rounded-full" />
              </div>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <LabelList queryKey={queryKey} setOpen={setOpen} data={data} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          <Filter />
          {selected ? <>{selected.title}</> : <>Categoria</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <LabelList queryKey={queryKey} setOpen={setOpen} data={data} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

function LabelList({ setOpen, data, queryKey }: LabelListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const item = searchParams.get(queryKey);
    setSelected(item);
  }, [searchParams, queryKey, open]);
  
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  return (
    <Command>
      <CommandInput placeholder="Buscar categoria..." />
      <CommandList>
        <CommandEmpty>Sem resultados.</CommandEmpty>
        <CommandGroup>
          {data.map((item) => (
            <CommandItem
              key={item.id}
              value={item.title}
              className={`${
                selected === item.title && "!text-primary font-bold"
              }`}
              onSelect={(value) => {
                setOpen(false);
                setSelected(value);
                router.push(
                  pathname + "?" + createQueryString(queryKey, value)
                );
              }}
            >
              {item.title}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
