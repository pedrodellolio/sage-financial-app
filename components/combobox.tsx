"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";

interface Item {
  key: string;
  value: any;
}

interface Props {
  options: { key: string; value: any }[];
  disabled?: boolean;
  selectedValue?: Item;
  className?: string;
  handleSelect?: (value?: string) => void;
}

export function Combobox({
  options,
  disabled,
  selectedValue,
  className,
  handleSelect,
}: Props) {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(
    selectedValue
  );
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          size={"sm"}
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className={`w-full justify-between ${className}`}
          disabled={disabled}
        >
          {selectedItem
            ? options.find((op) => op.value === selectedItem.value)?.key
            : "Selecione uma coluna..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Coluna..." />
          <CommandList>
            <CommandEmpty>Sem resultados.</CommandEmpty>
            <CommandGroup>
              {options.map((op) => (
                <CommandItem
                  key={op.value}
                  value={op.value}
                  onSelect={(currentValue) => {
                    const item = options.find((op) => op.key === currentValue);
                    setSelectedItem(item);
                    handleSelect && handleSelect(item?.key);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      selectedItem?.value === op.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                  {op.key}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
