"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Profile } from "@/dto/types";
import { DataTableRowActions } from "./row-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

export const columns: ColumnDef<Profile>[] = [
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
    id: "actions",
    cell: ({ row }) => {
      const profile = row.original;
      return <DataTableRowActions data={profile} />;
    },
  },
];
