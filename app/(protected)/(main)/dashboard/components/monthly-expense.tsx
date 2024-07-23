import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { getMonthlyTrend } from "../actions/charts";
import { Wallet } from "@/dto/types";

const MonthlyExpenseChart = dynamic(
  () =>
    import(
      "@/app/(protected)/(main)/dashboard/components/charts/monthly-expense-chart"
    ),
  { ssr: false }
);

export default async function MonthlyExpense() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;

  let chartData: Wallet[] = [];
  if (profileId) {
    chartData = await getMonthlyTrend(profileId);
  }

  return <MonthlyExpenseChart data={chartData} />;
}
