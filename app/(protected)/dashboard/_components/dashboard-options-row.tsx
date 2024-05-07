"use client";

import { DateRangePicker } from "@/components/date-range-picker";
import { DateRange } from "react-day-picker";
import Cookies from "js-cookie";

export function DashboardOptionsRow() {
  const handleDateRangeSelect = (range: DateRange | undefined) => {
    Cookies.set("dashboard-range", JSON.stringify(range));
  };

  return (
    <div className="flex items-center space-x-2">
      <DateRangePicker handleSelect={handleDateRangeSelect} />
      {/* <Button>Criar transação</Button> */}
    </div>
  );
}
