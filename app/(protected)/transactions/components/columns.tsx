"use client";

import { Checkbox } from "@/components/ui/checkbox";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "./data-table-column-header";
import { DataTableRowActions } from "./row-actions";
import { formatCurrency, formatDate } from "@/lib/utils";
import { Transaction, Type } from "@/dto/types";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<Transaction>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value: any) =>
          table.toggleAllPageRowsSelected(!!value)
        }
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "labels",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Labels" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex w-[100px] items-center">
          {row.original.labels.map((label) => {
            return (
              <Badge key={label.id} variant="outline">
                {label.title}
              </Badge>
            );
          })}
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "occurredAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Data" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(row.getValue("occurredAt"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "valueBrl",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Valor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className={`max-w-[500px] truncate font-medium`}>
            {row.original.type === Type.EXPENSE && "-"}
            {formatCurrency(row.getValue("valueBrl"))}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const transaction = row.original;
      return <DataTableRowActions data={transaction} />;
    },
  },
];
