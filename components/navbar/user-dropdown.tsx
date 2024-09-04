"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

interface Props {
  onboarding?: boolean;
}

export function UserDropdown({ onboarding }: Props) {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="w-full flex flex-row gap-2 mb-6 mt-2">
          <Avatar className="h-8 w-8">
            <AvatarImage src={session?.user?.image ?? ""} alt="user-icon" />
            <AvatarFallback>
              {session?.user?.name?.substring(0, 1)}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-start text-sm">
            <p className="truncate w-36 text-left">{session?.user.name}</p>
            <p className="text-xs text-muted-foreground truncate w-36 text-left">
              {session?.user.email}
            </p>
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40" align="end" forceMount>
        {onboarding && (
          <>
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => router.push("/settings/account")}
              >
                Preferências
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
          </>
        )}
        <DropdownMenuItem
          className="flex flex-row justify-between"
          onClick={() => signOut()}
        >
          Sair <LogOut className="w-4 h-4" />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
