"use client";

import { ProfileCombobox } from "./navbar/profile-combobox";
import NavbarLinks from "./navbar/navbar-links";
import { UserDropdown } from "./navbar/user-dropdown";
import { updateSelectedProfile } from "@/app/actions/user";
import { Profile } from "@/dto/types";
import { useSession } from "next-auth/react";
import Logo from "./logo";

export default function Header() {
  const { data: session } = useSession();

  const handleSelectProfile = async (profile: Profile | undefined) => {
    await updateSelectedProfile(session?.user.id, profile?.id);
  };

  return (
    <div className="w-full">
      <nav className="border-b border-b-foreground/8 h-16">
        <div className="flex items-center gap-10 px-14 text-sm h-full">
          <Logo />
          {session && (
            <div className="w-full flex flex-row gap-8 items-center justify-between">
              <NavbarLinks />
              <div className="flex flex-row items-center gap-4">
                <ProfileCombobox handleSelection={handleSelectProfile} />
                <UserDropdown />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
