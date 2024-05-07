import { ProfileCombobox } from "./navbar/profile-combobox";
import NavbarLinks from "./navbar/navbar-links";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { UserDropdown } from "./navbar/user-dropdown";
import { prisma } from "@/prisma/client";

async function getProfiles(id?: string) {
  return await prisma.profile.findMany({
    where: {
      userId: id,
    },
  });
}

export default async function Header() {
  const session = await getServerSession(authOptions);
  const profiles = await getProfiles(session?.user.id);
  return (
    <div className="w-full">
      <nav className="border-b border-b-foreground/8 h-16">
        <div className="flex items-center gap-10 px-14 text-sm h-full">
          <p className="font-bold text-lg">Sage</p>
          {session && (
            <div className="w-full flex flex-row gap-8 items-center justify-between">
              <NavbarLinks />
              <div className="flex flex-row items-center gap-4">
                <ProfileCombobox data={profiles} />
                <UserDropdown />
              </div>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
