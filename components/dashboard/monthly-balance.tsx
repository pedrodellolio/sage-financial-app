import dynamic from "next/dynamic";
import { getMonthlyTrend } from "../../app/actions/charts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
const MonthlyBalanceChart = dynamic(
  () => import("@/components/dashboard/charts/monthly-balance-chart"),
  { ssr: false }
);

async function MonthlyBalance() {
  const session = await getServerSession(authOptions);
  const profileId: string = session?.user.selectedProfile?.id;
  const monthlyTrend = await getMonthlyTrend(profileId);
  return <MonthlyBalanceChart data={monthlyTrend} />;
}

export default MonthlyBalance;
