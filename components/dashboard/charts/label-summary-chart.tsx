"use client";

import { capitalizeText, formatDate } from "@/lib/utils";
import { ApexOptions } from "apexcharts";
import { GeistSans } from "geist/font/sans";
import Chart from "react-apexcharts";
import { LabelSummary } from "../../../app/actions/charts";
import ChartPlaceholder from "../chart-placeholder";

interface Props {
  data: LabelSummary[];
}

export default function LabelSummaryChart(props: Props) {
  const options: ApexOptions = {
    chart: {
      type: "pie",
      fontFamily: GeistSans.style.fontFamily,
      toolbar: { show: false },
    },
    labels: props.data.map((t) => capitalizeText(t.label)),
    tooltip: {
      // theme: "dark",
    },
    legend: {
      show: false,
    },
    stroke: {
      show: false,
    },
    // dataLabels: {
    //   enabled: false,
    // },
  };

  const series = props.data.map((t) => t.totalValue);

  return props.data.length > 0 ? (
    <Chart
      type="pie"
      width="100%"
      height={300}
      options={options}
      series={series}
    />
  ) : (
    <ChartPlaceholder />
  );
}
