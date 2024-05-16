import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";
import {
  getLabelSummary,
  LabelSummary as LabelSummaryDTO,
} from "../actions/charts";

const LabelSummaryChart = dynamic(
  () =>
    import(
      "@/app/(protected)/dashboard/components/charts/label-summary-chart"
    ),
  { ssr: false }
);

export default async function LabelSummary() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;
  const cookieData = cookies().get("dashboard-range")?.value;
  const dashboardDateRange: DateRange = cookieData && JSON.parse(cookieData);
  
  let chartData: LabelSummaryDTO[] = [];
  if (profileId && dashboardDateRange) {
    chartData = await getLabelSummary(
      profileId,
      dashboardDateRange.from,
      dashboardDateRange.to
    );
  }

  return <LabelSummaryChart data={chartData} />;
}