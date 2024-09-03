"use client";

import { formatCurrency, formatDate } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { DataTableRowActions } from "./row-actions";
import { GridColDef } from "@mui/x-data-grid";
import { Transaction, TransactionType } from "@prisma/client";

export const columns: GridColDef<Transaction>[] = [
  {
    field: "title",
    headerName: "Título",
    headerClassName: "text-xs text-muted-foreground font-bold",
    flex: 1,
    editable: true,
    disableColumnMenu: true,
    renderCell: (params) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {params.value}
          </span>
        </div>
      );
    },
  },
  // {
  //   field: "labels",
  //   headerName: "Label",
  //   maxWidth: 150,
  //   flex: 1,
  //   renderCell: (params) => {
  //     return (
  //       <div className="flex items-center h-full">
  //         {params.row.labels.map((label) => {
  //           return (
  //             <Badge key={label.id} variant="outline">
  //               {label.title}
  //             </Badge>
  //           );
  //         })}
  //       </div>
  //     );
  //   },
  //   // filterFn: (row, id, value) => {
  //   //   return value.includes(row.getValue(id));
  //   // },
  // },
  {
    field: "occurredAt",
    headerName: "Data",
    headerClassName: "text-xs text-muted-foreground font-bold",
    editable: true,
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {formatDate(params.value)}
          </span>
        </div>
      );
    },
  },
  {
    field: "valueBrl",
    headerName: "Valor",
    headerAlign: "left",
    headerClassName: "text-xs text-muted-foreground font-bold",
    editable: true,
    type: "number",
    disableColumnMenu: true,
    flex: 1,
    renderCell: (params) => {
      return (
        <div className="flex space-x-2">
          <span className={`max-w-[500px] truncate font-medium`}>
            {params.row.type === TransactionType.EXPENSE && "-"}
            {formatCurrency(params.value)}
          </span>
        </div>
      );
    },
  },
  // {
  //   field: "actions",
  //   headerName: "",
  //   maxWidth: 55,
  //   flex: 1,
  //   sortable: false,
  //   editable: false,
  //   filterable: false,
  //   resizable: false,
  //   disableColumnMenu: true,
  //   renderCell: (params) => {
  //     return <DataTableRowActions data={params.row} />;
  //   },
  // },
];
