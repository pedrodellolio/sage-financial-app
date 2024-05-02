"use client";

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
import { useOptions } from "@/hooks/use-options";
import { Profile } from "@prisma/client";

interface Props {
  handleSelection?: (value: string) => void;
  data: Profile[];
}

export function ProfileCombobox(props: Props) {
  const { profile, setProfile } = useOptions();
  const [open, setOpen] = useState(false);

  if (!profile) {
    setProfile(props.data[0]);
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[160px] h-9 justify-between"
        >
          {profile?.title ?? "Selecione..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Buscar um perfil ..." />
          <CommandList>
            <CommandEmpty>Sem resultados.</CommandEmpty>
            <CommandGroup>
              {props.data.map((data) => (
                <CommandItem
                  key={data.id}
                  value={data.title}
                  onSelect={(currentValue) => {
                    setOpen(false);
                    setProfile(
                      props.data.find((p) => p.title === currentValue)
                    );
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      profile === data ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {data.title}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
