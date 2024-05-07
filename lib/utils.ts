import { type ClassValue, clsx } from "clsx";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeText(value: string) {
  return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
}

export function formatCurrency(value: string | number) {
  const options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "BRL",
  };

  if (typeof value === "string")
    value = parseFloat(value).toLocaleString("pt-BR", options);
  return value.toLocaleString("pt-BR", options);
}

export function formatDate(value: string | Date) {
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  };

  if (typeof value === "string")
    value = new Date(value).toLocaleString("pt-BR", options);
  return value.toLocaleString("pt-BR", options);
}

export function formatToBRLCurrency(value: string): string {
  let formattedValue = value.replace(/\D/g, "");
  formattedValue = formattedValue.replace(/(\d)(\d{2})$/, "$1,$2");
  formattedValue = formattedValue.replace(/(?=(\d{3})+(\D))\B/g, ".");
  return formattedValue;
}

export function getDefaultRangeDashboard(): DateRange {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setDate(-30);
  return { from: oneMonthAgo, to: today };
}
