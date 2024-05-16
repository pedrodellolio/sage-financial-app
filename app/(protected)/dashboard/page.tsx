import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardOptionsRow } from "./components/dashboard-options-row";
import DailyExpenses from "./components/daily-expenses";
import { OverviewRow } from "./components/overview-row";
import LabelSummary from "./components/label-summary";
import MonthlyBalance from "./components/monthly-balance";
import { ChartOptionsDropdown } from "./components/chart-options-dropdown";

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
            <CardTitle className="flex flex-row items-center justify-between">
              Despesas Diárias
              <ChartOptionsDropdown />
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <DailyExpenses />
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle className="flex flex-row items-center justify-between">
              Despesas por Categoria
              <ChartOptionsDropdown />
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <LabelSummary />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center justify-between">
              Receitas e Despesas Mensais
              <ChartOptionsDropdown />
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <MonthlyBalance />
          </CardContent>
        </Card>
        {/* <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Saldo Mensal</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <MonthlyExpense />
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
