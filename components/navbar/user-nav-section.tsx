import { ProfileCombobox } from "./profile-combobox";
import { UserDropdown } from "./user-dropdown";
import { updateSelectedProfile } from "@/app/actions/user";
import { Profile } from "@prisma/client";
import { revalidatePath } from "next/cache";

export default async function UserNavSection() {
  const handleSelectProfile = async (profile: Profile | undefined) => {
    "use server";
    await updateSelectedProfile(profile?.id);
    revalidatePath("");
  };

  return (
    <div className="flex flex-row items-center gap-4 px-1">
      <ProfileCombobox handleSelection={handleSelectProfile} />
    </div>
  );
}
