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
import { ComponentType, useCallback, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useMediaQuery } from "@/hooks/use-media-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar, Filter } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MONTHS } from "@/lib/date-utils";
import { capitalizeText } from "@/lib/utils";

interface LabelFilterComboBoxProps {
  data: string[];
  placeholder: string;
  width?: number;
  queryKey: string;
  selected: string;
  ItemsListComponent: ComponentType<any>;
}

interface LabelListProps {
  setOpen: (open: boolean) => void;
  data: string[];
  placeholder: string;
  queryKey: string;
}

export function FilterComboBox({
  data,
  placeholder,
  width,
  queryKey,
  selected,
  ItemsListComponent,
}: LabelFilterComboBoxProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            size={"sm"}
            variant="outline"
            className="justify-between text-muted-foreground relative"
            style={{ width: width + "px" ?? "150px" }}
          >
            <div className="flex items-center">
              <Calendar className="w-3 h-3 mr-2" />
              {selected ? <>{selected}</> : <>{placeholder}</>}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <ItemsListComponent
            placeholder={placeholder}
            setOpen={setOpen}
            data={data}
            queryKey={queryKey}
          />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          <Filter />
          {selected ? <>{selected}</> : <>{placeholder}</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <ItemsList
            placeholder={placeholder}
            setOpen={setOpen}
            data={data}
            queryKey={queryKey}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function MonthsList({
  setOpen,
  data,
  placeholder,
  queryKey,
}: LabelListProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    const month = searchParams.get(queryKey);
    if (month) {
      const selectedMonth = capitalizeText(MONTHS[parseInt(month) - 1]);
      setSelected(selectedMonth);
    }
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
      <CommandInput
        placeholder={`Buscar ${`${placeholder.toLowerCase()}`}...`}
      />
      <CommandList>
        <CommandEmpty>Sem resultados.</CommandEmpty>
        <CommandGroup>
          {data.map((month, i) => (
            <CommandItem
              key={i}
              value={month}
              className={`${selected === month && "!text-primary font-bold"}`}
              onSelect={(value) => {
                setOpen(false);
                setSelected(month);
                router.push(
                  pathname +
                    "?" +
                    createQueryString(
                      queryKey,
                      (MONTHS.indexOf(value.toUpperCase()) + 1).toString()
                    )
                );
              }}
            >
              {month}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export function ItemsList({
  setOpen,
  data,
  placeholder,
  queryKey,
}: LabelListProps) {
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
      <CommandInput
        placeholder={`Buscar ${`${placeholder.toLowerCase()}`}...`}
      />
      <CommandList>
        <CommandEmpty>Sem resultados.</CommandEmpty>
        <CommandGroup>
          {data.map((item, i) => (
            <CommandItem
              key={i}
              value={item.toString()}
              className={`${selected === item && "!text-primary font-bold"}`}
              onSelect={(value) => {
                setOpen(false);
                router.push(
                  pathname + "?" + createQueryString(queryKey, value)
                );
              }}
            >
              {item}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
