import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";
import {
  getLabelSummary,
  LabelSummary as LabelSummaryDTO,
} from "../_actions/charts";
import { getUserPreferences } from "@/lib/user-preferences";

const LabelSummaryChart = dynamic(
  () =>
    import(
      "@/app/(protected)/dashboard/_components/charts/label-summary-chart"
    ),
  { ssr: false }
);

export default async function LabelSummary() {
  const session = await getServerSession(authOptions);
  const profileId = session?.user.selectedProfile?.id;
  // const { dashboardDateRange } = getUserPreferences();
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
