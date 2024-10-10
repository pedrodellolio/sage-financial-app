import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { Summary, calculateSummary } from "../../app/actions/charts";
import { DateRange } from "react-day-picker";
import { cookies } from "next/headers";
import { getUserPreferences } from "@/lib/user-preferences";

export async function OverviewRow() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;
  // const { dashboardDateRange } = getUserPreferences();
  const cookieData = cookies().get("dashboard-range")?.value;
  const dashboardDateRange: DateRange = cookieData && JSON.parse(cookieData);

  let summary: Summary | null = null;
  if (profileId && dashboardDateRange) {
    summary = await calculateSummary(
      profileId,
      dashboardDateRange.from,
      dashboardDateRange.to
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Receitas do período</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary ? summary.income : 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            +20.1% em relação ao período passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Despesas do período</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary ? summary.expenses : 0)}
          </div>
          <p className="text-xs text-muted-foreground">
            +180.1% em relação ao período passado
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Saldo do período</CardTitle>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            className="h-4 w-4 text-muted-foreground"
          >
            <rect width="20" height="14" x="2" y="5" rx="2" />
            <path d="M2 10h20" />
          </svg>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {formatCurrency(summary ? summary.income - summary.expenses : 0)}
          </div>
          <p className="text-xs text-muted-foreground">+19% em relação ao período passado</p>
        </CardContent>
      </Card>
    </div>
  );
}