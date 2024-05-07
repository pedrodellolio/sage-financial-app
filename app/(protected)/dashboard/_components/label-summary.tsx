import { authOptions } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";
import {
  getLabelSummary,
  LabelSummary as LabelSummaryDTO,
} from "../_actions/charts";

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
  const cookieData = cookies().get("dashboard-range")!.value;
  const dateRange: DateRange = JSON.parse(cookieData);

  let chartData: LabelSummaryDTO[] = [];
  if (profileId && dateRange) {
    chartData = await getLabelSummary(
      profileId,
      dateRange.from!,
      dateRange.to!
    );
  }

  return <LabelSummaryChart data={chartData} />;
}
