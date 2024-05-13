"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import { GeistSans } from "geist/font/sans";
import Chart from "react-apexcharts";
import { Expense } from "../../_actions/charts";

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
