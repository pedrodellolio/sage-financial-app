"use client";

import { formatCurrency } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import { GeistSans } from "geist/font/sans";
import Chart from "react-apexcharts";
import { Expense } from "../../../app/actions/charts";
import ChartPlaceholder from "../chart-placeholder";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { Bar, BarChart } from "recharts";

interface Props {
  data: Expense[];
}

export default function DailyExpenseChart(props: Props) {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: GeistSans.style.fontFamily,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: props.data.map((t) => t.occurredAt),
      axisTicks: { show: false },
      axisBorder: { show: false },
      labels: {
        formatter(value) {
          return new Date(value).getDate().toString();
        },
      },
    },
    grid: {
      borderColor: "hsl(var(--border))",
    },
    colors: ["hsl(var(--primary))"],
    tooltip: {
      followCursor: true,
      // theme: "dark",
      x: {
        show: false,
      },
      y: {
        formatter(val) {
          return formatCurrency(val);
        },
      },
    },
  };

  const series = [
    {
      name: "Gastos no dia",
      data: props.data.map((t) => t.valueBrl),
    },
  ];

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies ChartConfig;

  return props.data.length > 0 ? (
    <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
      <BarChart accessibilityLayer data={chartData}>
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  ) : (
    <ChartPlaceholder />
  );
}
