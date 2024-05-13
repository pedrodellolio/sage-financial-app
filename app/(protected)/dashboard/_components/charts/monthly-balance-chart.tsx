"use client";

import { Wallet } from "@/dto/types";
import { formatCurrency } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import { GeistSans } from "geist/font/sans";
import Chart from "react-apexcharts";

interface Props {
  data: Wallet[];
}

export default function MonthlyBalanceChart(props: Props) {
  const options: ApexOptions = {
    chart: {
      fontFamily: GeistSans.style.fontFamily,
      height: 350,
      type: "line",
      stacked: false,
      toolbar: { show: false },
    },
    stroke: {
      width: [
        0, 0,
        // 3
      ],
      curve: "straight",
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 4,
        borderRadiusApplication: "end",
      },
    },
    grid: {
      borderColor: "hsl(var(--border))",
    },
    legend: {
      show: false,
    },
    labels: props.data.map((w) =>
      Intl.DateTimeFormat("pt-br", { month: "long" }).format(
        new Date(w.month.toString())
      )
    ),
    markers: {
      size: 1,
    },
    colors: ["hsl(var(--primary))", "hsl(var(--success))"],
    xaxis: {
      type: "category",
      axisTicks: { show: false },
      axisBorder: { show: false },
    },
    yaxis: {
      min: 0,
    },
    tooltip: {
      // theme: "dark",
      shared: true,
      intersect: false,
      followCursor: true,
      x: {
        show: false,
      },
      y: {
        formatter(val) {
          return formatCurrency(val);
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
  };

  const series = [
    {
      name: "Despesas",
      type: "column",
      data: props.data.map((w) => w.expensesBrl),
    },
    {
      name: "Receitas",
      type: "column",
      data: props.data.map((w) => w.incomeBrl),
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
