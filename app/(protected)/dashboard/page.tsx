import { getDailyExpenses, getLabelSummary } from "./_actions/fetchChartsData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";

// const DailyExpenseChart = dynamic(
//   () =>
//     import(
//       "@/app/(protected)/dashboard/_components/charts/daily-expense-chart"
//     ),
//   { ssr: false }
// );

// const LabelSummaryChart = dynamic(
//   () =>
//     import(
//       "@/app/(protected)/dashboard/_components/charts/label-summary-chart"
//     ),
//   { ssr: false }
// );

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  // const profileTitle = searchParams["p"]!;

  return (
    <div className="flex-1 space-y-4 w-full">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight mb-4">Dashboard</h2>
        <div className="flex items-center space-x-2">
          <Button variant={"secondary"}>Add transaction</Button>
        </div>
      </div>

      {/* <OverviewRow profileTitle={profileTitle as string} /> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Gastos Diários</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <DailyExpenseChart data={transactions} /> */}
          </CardContent>
        </Card>

        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Gastos por Categoria</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            {/* <LabelSummaryChart data={labelSummary} /> */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
