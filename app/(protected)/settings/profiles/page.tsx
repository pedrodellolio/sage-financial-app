import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { ProfilesDataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getServerSession } from "next-auth";
import { Profile } from "@/dto/types";
import { getProfiles } from "@/app/actions/profile";
import { authOptions } from "@/lib/auth-options";
import AddProfileDialog from "@/components/dialogs/add-profile-dialog";

export const metadata: Metadata = {
  title: "Preferências: Perfis",
  description: "",
};

export default async function Profiles({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  const isAddProfileDialogOpen = !!searchParams["p"];

  let profiles: Profile[] = [];
  if (userId) {
    profiles = await getProfiles(userId);
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Perfis</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie os perfis associados a sua conta.
        </p>
      </div>
      <Separator />
      <ProfilesDataTable data={profiles} columns={columns} />
      <AddProfileDialog open={isAddProfileDialogOpen} />
    </div>
  );
}
