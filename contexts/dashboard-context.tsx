"use client";

import {
  ReactNode,
  SetStateAction,
  createContext,
  useEffect,
  useState,
} from "react";
import { DateRange } from "react-day-picker";
import Cookies from "js-cookie";
import { getDefaultRangeDashboard } from "@/lib/utils";

interface DashboardContextData {
  dateRange: DateRange;
  setDateRange: (value: SetStateAction<DateRange>) => void;
}

const DashboardContext = createContext<DashboardContextData>(
  {} as DashboardContextData
);
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [dateRange, setDateRange] = useState<DateRange>(
    getDefaultRangeDashboard()
  );

  useEffect(() => {
    const preferences = Cookies.get("dashboard-range");
    if (!preferences) Cookies.set("dashboard-range", JSON.stringify(dateRange));
    setDateRange(preferences ? JSON.parse(preferences) : dateRange);
  }, []);

  return (
    <DashboardContext.Provider
      value={{
        dateRange,
        setDateRange,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
export default DashboardContext;
