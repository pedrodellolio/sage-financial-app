import { MappedTransaction, UploadedFile } from "@/dto/types";
import { Transaction, TransactionType, Prisma } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { getMonth, getYear, isValid, parse } from "date-fns";
import { ptBR } from "date-fns/locale";
import { DateRange } from "react-day-picker";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalizeText(value: string) {
  return value && value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
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

export function currencyStringToTransactionValue(currencyString: string) {
  let error: string | undefined = undefined;

  if (isNumber(currencyString)) {
    const value = parseFloat(currencyString);
    const type = value < 0 ? TransactionType.EXPENSE : TransactionType.INCOME;
    return { valueBrl: Math.abs(value), type: type, error };
  }

  const cleanedString = currencyString.replace(/R\$/g, "").replace(/\s/g, "");
  const normalizedString = cleanedString.replace(",", ".");
  const numberValue = parseFloat(normalizedString);

  if (isNaN(numberValue)) {
    const message = `Tentativa de conversão inválida: ${currencyString}`;
    error = message;
    throw new Error(message);
  }

  const type =
    numberValue < 0 ? TransactionType.EXPENSE : TransactionType.INCOME;
  return { valueBrl: Math.abs(numberValue), type: type, error };
}

export function convertStringToDate(dateString: string): Date | null {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date(), {
    locale: ptBR,
  });

  if (isNaN(parsedDate.getTime())) {
    console.error("Invalid date");
    return null;
  }

  return parsedDate;
}

export function isValidDateString(dateString: string): boolean {
  const parsedDate = parse(dateString, "dd/MM/yyyy", new Date(), {
    locale: ptBR,
  });
  return isValid(parsedDate);
}

export function getDefaultRangeDashboard(): DateRange {
  const today = new Date();
  const oneMonthAgo = new Date(today);
  oneMonthAgo.setDate(-30);
  return { from: oneMonthAgo, to: today };
}

export function formatBytes(bytes: number) {
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
  if (bytes === 0) return "0 Bytes";
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return parseFloat((bytes / Math.pow(1024, i)).toFixed(2)) + " " + sizes[i];
}

export function getCurrentPeriod(): [number, number] {
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);
  return [currentMonth, currentYear];
}

export function isNumber(value?: string) {
  const regex = /^-?\d+(\.\d+)?$/;
  if (!value) return false;
  return regex.test(value);
}

export function parseNumber(input?: string): number | undefined {
  const parsed = Number(input); // Try to parse the input as a number
  return isNaN(parsed) ? undefined : parsed; // Return undefined if parsing fails
}
