import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";
import { Expense, getDailyExpenses } from "../_actions/charts";

const DailyExpenseChart = dynamic(
  () =>
    import(
      "@/app/(protected)/dashboard/_components/charts/daily-expense-chart"
    ),
  { ssr: false }
);

export default async function DailyExpenses() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;
  const cookieData = cookies().get("dashboard-range")!.value;
  const dateRange: DateRange = JSON.parse(cookieData);

  let chartData: Expense[] = [];
  if (profileId && dateRange) {
    chartData = await getDailyExpenses(
      profileId,
      dateRange.from!,
      dateRange.to!
    );
  }

  return <DailyExpenseChart data={chartData} />;
}
