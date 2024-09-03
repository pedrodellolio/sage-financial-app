import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardOptionsRow } from "../../../../components/dashboard/dashboard-options-row";
import { OverviewRow } from "../../../../components/dashboard/overview-row";
import { ChartOptionsDropdown } from "../../../../components/dashboard/chart-options-dropdown";
import DailyExpenses from "../../../../components/dashboard/daily-expenses";
import { Suspense } from "react";
import LabelSummary from "../../../../components/dashboard/label-summary";
import MonthlyBalance from "../../../../components/dashboard/monthly-balance";

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-4 w-full p-6">
      <div className="flex items-center justify-end">
        {/* <h2 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h2> */}
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
            {/* <Suspense fallback={<p>Carregando...</p>}>
              <DailyExpenses />
            </Suspense> */}
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
            <Suspense fallback={<p>Carregando...</p>}>
              <LabelSummary />
            </Suspense>
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {/* <Card className="col-span-4">
          <CardHeader>
            <CardTitle className="flex flex-row items-center justify-between">
              Receitas e Despesas Mensais
              <ChartOptionsDropdown />
            </CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<p>Carregando...</p>}>
              <MonthlyBalance />
            </Suspense>
          </CardContent>
        </Card> */}
        {/* <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Saldo Mensal</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Suspense fallback={<p>Carregando...</p>}>
              <MonthlyBalance />
            </Suspense>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
