import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardOptionsRow } from "./_components/dashboard-options-row";
import DailyExpenses from "./_components/daily-expenses";
import { OverviewRow } from "./_components/overview-row";
import LabelSummary from "./_components/label-summary";

export default async function Dashboard() {
  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h2>
        <DashboardOptionsRow />
      </div>

      <OverviewRow />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Gastos Diários</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DailyExpenses />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LabelSummary />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
