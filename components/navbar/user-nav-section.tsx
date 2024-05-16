import { getProfiles } from "@/app/actions/profile";
import { Profile } from "@/dto/types";
import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { ProfileCombobox } from "./profile-combobox";
import { UserDropdown } from "./user-dropdown";
import { updateSelectedProfile } from "@/app/actions/user";
import { useRouter } from "next/navigation";

export default async function UserNavSection() {
  const router = useRouter();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  let profiles: Profile[] = [];
  if (userId) {
    profiles = await getProfiles(session?.user.id);
  }

  const handleSelectProfile = async (profile: Profile | undefined) => {
    await updateSelectedProfile(session?.user.id, profile?.id);
    router.refresh();
  };

  return (
    <div className="flex flex-row items-center gap-4">
      <ProfileCombobox data={profiles} />
      <UserDropdown />
    </div>
  );
}
