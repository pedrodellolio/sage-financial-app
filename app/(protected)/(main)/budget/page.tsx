import { authOptions } from "@/lib/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import AddBudgetDialog from "@/components/dialogs/add-budget-dialog";
import { getLabels } from "@/app/actions/labels";
import { getPeriodIncome } from "../dashboard/actions/charts";
import { Label } from "@/dto/types";
import { getCurrentPeriod } from "@/lib/utils";
import { endOfMonth, startOfMonth } from "date-fns";
import { getBudgetByPeriod } from "@/app/actions/budget";
import BudgetList from "@/components/budget-list";
import { Budget } from "@prisma/client";

export const metadata: Metadata = {
  title: "Planejamento",
  description: "",
};

export default async function BudgetPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;

  const isAddBudgetDialogOpen = !!searchParams["b"];

  let budget: Budget | null = null;
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
      <BudgetList monthIncome={income} />
      <AddBudgetDialog labels={labels} open={isAddBudgetDialogOpen} />
    </div>
  );
}
