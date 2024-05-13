import { cookies } from "next/headers";
import { DateRange } from "react-day-picker";

export function getUserPreferences() {
  const cookieData = cookies().get("dashboard-range")?.value;
  const dateRange: DateRange = cookieData && JSON.parse(cookieData);

  return { dashboardDateRange: dateRange };
}
