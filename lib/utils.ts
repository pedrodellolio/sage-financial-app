import { TransactionType } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { getMonth, getYear } from "date-fns";
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

export function currencyStringToTransactionValue(currencyString: string) {
  let error: string | undefined = undefined;
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

export function convertStringToDate(dateString: string): Date {
  console.log(dateString);
  const [day, month, year] = dateString.split("/").map(Number);
  console.log(new Date(year, month - 1, day));
  return new Date(year, month - 1, day);
}

export function isValidDate(dateString: string): boolean {
  const date = convertStringToDate(dateString);
  return !isNaN(date.getTime());
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

// export function fileDataToTransactions(
//   fileId: string,
//   file: UploadedFile
// ): any[] {
//   let transactions: any[] = [];
//   file.data.map((item) => {
//     const mapped: Partial<MappedTransaction> = {};
//     file.mapping.forEach((map) => {
//       mapped[map.key] = item[map.value];
//     });

//     const { valueBrl, type, error } = currencyStringToTransactionValue(
//       mapped.valueBrl ?? "R$0,00"
//     );
//     transactions.push({
//       title: mapped.title ?? `Movimentação de ${mapped.occurredAt}`,
//       occurredAt:
//         mapped.occurredAt && isValidDate(mapped.occurredAt)
//           ? convertStringToDate(mapped.occurredAt)
//           : new Date(),
//       valueBrl: valueBrl,
//       type: type,
//       fileId,
//     });
//   });

//   return transactions;
// }

export function getCurrentPeriod(): [number, number] {
  const currentDate = new Date();
  const currentMonth = getMonth(currentDate) + 1;
  const currentYear = getYear(currentDate);
  return [currentMonth, currentYear];
}
