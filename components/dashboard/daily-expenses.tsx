import { getDailyExpenses } from "../../app/actions/charts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";
import DailyExpenseChart from "./charts/daily-expense-chart";

export default async function DailyExpenses() {
  const session = await getServerSession(authOptions);
  const profileId: string = session?.user.selectedProfile?.id;
  const cookieData = cookies().get("dashboard-range")?.value;
  const { from, to }: DateRange = cookieData && JSON.parse(cookieData);

  const dailyExpenses = await getDailyExpenses(profileId, from!, to!);
  const isEmpty = dailyExpenses.every((item) => item.valueBrl === 0);

  return <DailyExpenseChart data={isEmpty ? [] : dailyExpenses} />;
}
