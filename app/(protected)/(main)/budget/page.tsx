import { authOptions } from "@/lib/auth-options";
import { Metadata } from "next";
import { getServerSession } from "next-auth";
import AddBudgetDialog from "@/components/dialogs/add-budget-dialog";
import { getLabels } from "@/app/actions/labels";
import { getPeriodIncome } from "../../../actions/charts";
import { endOfMonth, startOfMonth } from "date-fns";
import BudgetList from "@/components/budget-list";

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
  const profileId: string = session?.user.selectedProfile?.id;

  const isAddBudgetDialogOpen = !!searchParams["b"];

  // let budget: Budget | null = null;
  const labels = await getLabels();
  const today = new Date();
  const income = await getPeriodIncome(startOfMonth(today), endOfMonth(today));

  return (
    <div className="w-full">
      <h2 className="text-3xl font-bold tracking-tight mb-4">Planejamento</h2>
      <BudgetList monthIncome={income} />
      <AddBudgetDialog labels={labels} open={isAddBudgetDialogOpen} />
    </div>
  );
}
