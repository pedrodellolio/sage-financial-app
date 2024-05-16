"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Label } from "@/dto/types";
import { DataTableRowActions } from "./row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { capitalizeText } from "@/lib/utils";

export const columns: ColumnDef<Label>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Título" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {capitalizeText(row.getValue("title"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "colorHex",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Cor" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue<string>("colorHex").toUpperCase()}
          </span>
        </div>
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const label = row.original;
      return <DataTableRowActions data={label} />;
    },
  },
];
