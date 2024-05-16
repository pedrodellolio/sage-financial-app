import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { Expense, getDailyExpenses } from "../actions/charts";
import { getUserPreferences } from "@/lib/user-preferences";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";

const DailyExpenseChart = dynamic(
  () =>
    import(
      "@/app/(protected)/dashboard/components/charts/daily-expense-chart"
    ),
  { ssr: false }
);

export default async function DailyExpenses() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;
  // const { dashboardDateRange } = getUserPreferences();
  const cookieData = cookies().get("dashboard-range")?.value;
  const dashboardDateRange: DateRange = cookieData && JSON.parse(cookieData);

  let chartData: Expense[] = [];
  if (profileId && dashboardDateRange) {
    chartData = await getDailyExpenses(
      profileId,
      dashboardDateRange.from!,
      dashboardDateRange.to!
    );
  }

  return <DailyExpenseChart data={chartData} />;
}
