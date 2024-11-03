"use client";

import SortingButton from "@/components/button/sorting-button";
import { Badge } from "@/components/ui/badge";
import { MONTHS } from "@/lib/date-utils";
import { Prisma, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";

type TransactionWithLabel = Prisma.TransactionGetPayload<{
  include: { labels: true };
}>;

const monthFilterFn = (
  row: any,
  columnId: string,
  filterValue: { month: string; year: number }
) => {
  const dateValue = new Date(row.getValue(columnId));
  const monthName = MONTHS[dateValue.getMonth()];
  const year = dateValue.getFullYear();

  const monthMatches =
    !filterValue.month || monthName === filterValue.month.toLowerCase();
  const yearMatches = !filterValue.year || year === filterValue.year;

  return monthMatches && yearMatches;
};

export const columnsAlias = ["title", "labels", "occurredAt", "valueBrl"];

export const columns: ColumnDef<TransactionWithLabel>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return <SortingButton column={column} title={"Título"} />;
    },
    cell: ({ row }) => {
      return <div className="w-96">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "labels",
    header: "Categorias",
    cell: ({ row }) => {
      return (
        <div className="flex flex-wrap gap-2">
          {row.original.labels.map((label) => (
            <Badge
              className="text-muted-foreground border-muted-foreground/5 bg-muted-foreground/5 dark:bg-muted-foreground/10"
              key={label.id}
              variant={"outline"}
            >
              {label.title}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    accessorKey: "occurredAt",
    header: "Data",
    filterFn: monthFilterFn,
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("occurredAt")).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
      return (
        <div className="flex flex-row items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4 text-muted-foreground" />
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "valueBrl",
    header: "Valor",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("valueBrl"));
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return (
        <div className="flex flex-row items-center gap-2">
          <div
            className={`rounded-full p-1 ${
              row.original.type === TransactionType.EXPENSE
                ? "bg-red-500 text-red-400 bg-opacity-25"
                : "bg-green-500 text-green-400 bg-opacity-25"
            }`}
          >
            {row.original.type === TransactionType.EXPENSE ? (
              <ChevronDown className="w-4 h-4" />
            ) : (
              <ChevronUp className="w-4 h-4" />
            )}
          </div>
          <p>{formatted}</p>
        </div>
      );
    },
  },
];
