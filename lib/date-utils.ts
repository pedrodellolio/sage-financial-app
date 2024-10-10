import { format, getYear } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeText } from "./utils";

export const MONTHS = [
  "JANEIRO",
  "FEVEREIRO",
  "MARÇO",
  "ABRIL",
  "MAIO",
  "JUNHO",
  "JULHO",
  "AGOSTO",
  "SETEMBRO",
  "OUTUBRO",
  "NOVEMBRO",
  "DEZEMBRO",
];

export const getUniqueMonths = (array: any[]): string[] => {
  const months = array.map((item) => {
    const month = format(item, "MMMM", { locale: ptBR });
    return `${capitalizeText(month)}`;
  });

  return Array.from(new Set(months));
};

export const getUniqueYears = (array: any[]): number[] => {
  const years = array.map((item) => {
    return getYear(item);
  });

  return Array.from(new Set(years));
};

export function isYear(value?: string | number) {
  const year = Number(value);
  const currentYear = new Date().getFullYear();
  return (
    !isNaN(year) &&
    Number.isInteger(year) &&
    year >= 1900 &&
    year <= currentYear
  );
}
