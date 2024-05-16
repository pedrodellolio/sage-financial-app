import { Separator } from "@/components/ui/separator";
import { Metadata } from "next";
import { LabelsDataTable } from "./components/data-table/data-table";
import { columns } from "./components/data-table/columns";
import { getServerSession } from "next-auth";
import { Label } from "@/dto/types";
import { authOptions } from "@/lib/auth-options";
import { getLabels } from "@/app/actions/labels";

export const metadata: Metadata = {
  title: "Preferências: Perfis",
  description: "",
};

export default async function Labels() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;

  let labels: Label[] = [];
  if (profileId) {
    labels = await getLabels(profileId);
  }

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
    </div>
  );
}
