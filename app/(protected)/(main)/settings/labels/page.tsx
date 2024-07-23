import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { LabelsDataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getLabels } from "@/app/actions/labels";
import AddLabelDialog from "@/components/dialogs/add-label-dialog";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";

export const metadata: Metadata = {
  title: "Preferências: Perfis",
  description: "",
};

export default async function Labels({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const selectedProfileId = session?.user.selectedProfile?.id;

  const isAddLabelDialogOpen = !!searchParams["l"];
  const profileId = searchParams["profile"];
  const labels = await getLabels(
    profileId ? profileId.toString() : selectedProfileId
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">Categorias</h3>
        <p className="text-sm text-muted-foreground">
          Gerencie as categorias associadas a sua conta.
        </p>
      </div>
      <Separator />
      <LabelsDataTable data={labels} columns={columns} />
      <AddLabelDialog open={isAddLabelDialogOpen} />
    </div>
  );
}
