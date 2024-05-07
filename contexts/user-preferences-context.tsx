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

interface UserPreferencesContextData {
  dashboardDateRange: DateRange;
  setDashboardDateRange: (value: SetStateAction<DateRange>) => void;
}

const UserPreferencesContext = createContext<UserPreferencesContextData>(
  {} as UserPreferencesContextData
);
export const UserPreferencesProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [dashboardDateRange, setDashboardDateRange] = useState<DateRange>(
    getDefaultRangeDashboard()
  );

  useEffect(() => {
    const preferences = Cookies.get("dashboard-range");

    if (!preferences) {
      Cookies.set("dashboard-range", JSON.stringify(dashboardDateRange));
    }

    setDashboardDateRange(
      preferences ? JSON.parse(preferences) : dashboardDateRange
    );
  }, []);

  return (
    <UserPreferencesContext.Provider
      value={{
        dashboardDateRange,
        setDashboardDateRange,
      }}
    >
      {children}
    </UserPreferencesContext.Provider>
  );
};
export default UserPreferencesContext;
