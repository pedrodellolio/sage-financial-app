"use client";

import { formatDate } from "@/lib/utils";
import { Transaction } from "@/models/transaction";
import { ApexOptions } from "apexcharts";
import { GeistSans } from "geist/font/sans";
import Chart from "react-apexcharts";

interface Props {
  data: Transaction[];
}

export default function DailyExpenseChart(props: Props) {
  const options: ApexOptions = {
    chart: {
      type: "bar",
      fontFamily: GeistSans.style.fontFamily,
      toolbar: { show: false },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: props.data.map((t) => formatDate(t.occurred_at)),
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    grid: {
      borderColor: "hsl(var(--border))",
    },
    colors: ["hsl(var(--foreground))"],
    tooltip: {
      theme: "light",
    },
  };

  const series = [
    {
      name: "Gastos no dia",
      data: props.data.map((t) => t.value_brl),
    },
  ];

  return (
    <Chart
      type="bar"
      width="100%"
      height={300}
      options={options}
      series={series}
    />
  );
}
