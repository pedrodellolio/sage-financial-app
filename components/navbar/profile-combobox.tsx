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
import { useSession } from "next-auth/react";
import { updateSelectedProfile } from "@/app/actions/user";
import { Profile } from "@/dto/types";
import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";

interface Props {
  handleSelection?: (value: string) => void;
  data: Profile[];
}

export function ProfileCombobox(props: Props) {
  const router = useRouter();
  const { data: session } = useSession();

  const [open, setOpen] = useState(false);
  const [profile, setProfile] = useState<Profile | null | undefined>();

  const handleSelectProfile = async (profile: Profile | undefined) => {
    setOpen(false);
    await updateSelectedProfile(session?.user.id, profile?.id);
    setProfile(profile);
    router.refresh();
  };

  useEffect(() => {
    setProfile(session?.user.selectedProfile);
  }, [session]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[160px] h-9 justify-between"
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
              {props.data.map((data) => (
                <CommandItem
                  key={data.id}
                  value={data.title}
                  onSelect={(currentValue) => {
                    const profile = props.data.find(
                      (p) => p.title === currentValue
                    );
                    handleSelectProfile(profile);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      profile === data ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {capitalizeText(data.title)}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
