"use client";

import { formatDate } from "@/lib/utils";
import { LabelSummary } from "@/models/label-summary";
import { ApexOptions } from "apexcharts";
import { GeistSans } from "geist/font/sans";
import Chart from "react-apexcharts";

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
    labels: props.data.map((t) => formatDate(t.title)),
    tooltip: {
      theme: "light",
    },
    // dataLabels: {
    //   enabled: false,
    // },
  };

  const series = props.data.map((t) => t.total_brl);
  return (
    <Chart
      type="pie"
      width="100%"
      height={300}
      options={options}
      series={series}
    />
  );
}
