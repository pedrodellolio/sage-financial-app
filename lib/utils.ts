import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
