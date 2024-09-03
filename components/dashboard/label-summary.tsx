import dynamic from "next/dynamic";
import { getLabelSummary } from "../../app/actions/charts";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";

const LabelSummaryChart = dynamic(
  () =>
    import(
      "@/components/dashboard/charts/label-summary-chart"
    ),
  { ssr: false }
);

async function LabelSummary() {
  const session = await getServerSession(authOptions);
  const profileId: string = session?.user.selectedProfile?.id;
  const cookieData = cookies().get("dashboard-range")?.value;
  const { from, to }: DateRange = cookieData && JSON.parse(cookieData);

  const labelSummary = await getLabelSummary(profileId, from!, to!);
  return <LabelSummaryChart data={labelSummary} />;
}

export default LabelSummary;
