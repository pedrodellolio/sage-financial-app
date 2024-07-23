import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { getMonthlyTrend } from "../actions/charts";
import { Wallet } from "@/dto/types";

const MonthlyBalanceChart = dynamic(
  () =>
    import(
      "@/app/(protected)/(main)/dashboard/components/charts/monthly-balance-chart"
    ),
  { ssr: false }
);

export default async function MonthlyBalance() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;

  let chartData: Wallet[] = [];
  if (profileId) {
    chartData = await getMonthlyTrend(profileId);
  }

  return <MonthlyBalanceChart data={chartData} />;
}
