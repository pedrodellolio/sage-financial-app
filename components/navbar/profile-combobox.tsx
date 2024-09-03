"use client";

import { Check, ChevronsUpDown } from "lucide-react";
import { capitalizeText, cn } from "@/lib/utils";
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
import { useEffect, useState } from "react";
import axios from "axios";
import { useUser } from "@/hooks/use-user";
import { Profile } from "@prisma/client";

interface Props {
  handleSelection?: (profile: Profile) => Promise<void>;
}

export function ProfileCombobox(props: Props) {
  const { profile, setProfile } = useUser();
  const [data, setData] = useState<Profile[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      const response = await axios.get("/api/getUserProfiles");
      const profiles: Profile[] = response.data;
      setData(profiles);
    };

    loadData();
  }, []);

  // useEffect(() => {
  //   const profile = data.find((d) => d.id === searchParams.get("profile"));
  //   if (profile) setProfile(profile);
  //   else setProfile(session?.user.selectedProfile);
  // }, [data, session]);

  const handleSelectProfile = async (profile: Profile | null) => {
    setOpen(false);
    props.handleSelection && profile && (await props.handleSelection(profile));
    setProfile(profile);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          size={"sm"}
          className="w-full justify-between"
        >
          {profile ? capitalizeText(profile.title) : "Selecione..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Perfil" />
          <CommandList>
            <CommandEmpty>Sem resultados.</CommandEmpty>
            <CommandGroup>
              {data.map((d) => (
                <CommandItem
                  key={d.id}
                  value={d.title}
                  onSelect={(currentValue) => {
                    const profile = data.find((p) => p.title === currentValue);
                    handleSelectProfile(profile ?? null);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      profile === d ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {capitalizeText(d.title)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
