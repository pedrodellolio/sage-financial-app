import { authOptions } from "@/lib/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import BudgetCard from "./components/budget-card";
import { Plus } from "lucide-react";
import MonthChanger from "@/components/month-changer";
import AddBudgetDialog from "@/components/dialogs/add-budget-dialog";
import { getLabels } from "@/app/actions/labels";
import { getPeriodIncome } from "../dashboard/actions/charts";
import { Label } from "@/dto/types";
import { formatCurrency } from "@/lib/utils";
import { endOfMonth, startOfMonth } from "date-fns";

export const metadata: Metadata = {
  title: "Planejamento",
  description: "",
};

export default async function Budget({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;

  const isAddBudgetDialogOpen = !!searchParams["b"];

  let labels: Label[] = [];
  let income: number = 0;
  if (profileId) {
    labels = await getLabels(profileId);
    const today = new Date();
    income = await getPeriodIncome(
      profileId,
      startOfMonth(today),
      endOfMonth(today)
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Planejamento</h2>
      <div className="flex flex-row justify-between border-b pb-2 mt-8">
        <MonthChanger />
        <p className="text-2xl font-bold text-primary">
          {formatCurrency(income)}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 mt-4 gap-4">
        <BudgetCard />
        <BudgetCard creating />
      </div>

      <AddBudgetDialog labels={labels} open={isAddBudgetDialogOpen} />
    </div>
  );
}
