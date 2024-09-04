"use client";

import { Badge } from "@/components/ui/badge";
import { Transaction, TransactionType } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { ChevronDown, ChevronUp, TrendingDown, TrendingUp } from "lucide-react";

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "title",
    header: "Título",
    cell: ({ row }) => {
      return <div className="w-96">{row.getValue("title")}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "Categoria",
    // cell: ({ row }) => {
    //   return (
    //     <div>
    //       <Badge>{row.original.}</Badge>
    //     </div>
    //   );
    // },
  },
  {
    accessorKey: "occurredAt",
    header: "Data",
    cell: ({ row }) => {
      const formatted = new Date(row.getValue("occurredAt")).toLocaleDateString(
        "pt-BR",
        {
          year: "numeric",
          month: "short",
          day: "numeric",
        }
      );
      return <div>{formatted}</div>;
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

// export const columns: GridColDef<Transaction>[] = [
//   {
//     field: "title",
//     headerName: "Título",
//     headerClassName: "text-xs text-muted-foreground font-bold",
//     flex: 1,
//     editable: true,
//     disableColumnMenu: true,
//   },
//   // {
//   //   field: "labels",
//   //   headerName: "Label",
//   //   maxWidth: 150,
//   //   flex: 1,
//   //   renderCell: (params) => {
//   //     return (
//   //       <div className="flex items-center h-full">
//   //         {params.row.labels.map((label) => {
//   //           return (
//   //             <Badge key={label.id} variant="outline">
//   //               {label.title}
//   //             </Badge>
//   //           );
//   //         })}
//   //       </div>
//   //     );
//   //   },
//   //   // filterFn: (row, id, value) => {
//   //   //   return value.includes(row.getValue(id));
//   //   // },
//   // },
//   {
//     field: "occurredAt",
//     headerName: "Data",
//     headerClassName: "text-xs text-muted-foreground font-bold",
//     editable: true,
//     disableColumnMenu: true,
//     flex: 1,
//     renderCell: (params) => {
//       return (
//         <div className="flex space-x-2">
//           <span>
//             {formatDate(params.value)}
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     field: "valueBrl",
//     headerName: "Valor",
//     headerAlign: "left",
//     headerClassName: "text-xs text-muted-foreground font-bold",
//     editable: true,
//     type: "number",
//     disableColumnMenu: true,
//     flex: 1,
//     renderCell: (params) => {
//       return (
//         <div className="flex space-x-2">
//           <span>
//             {params.row.type === TransactionType.EXPENSE && "-"}
//             {formatCurrency(params.value)}
//           </span>
//         </div>
//       );
//     },
//   },
//   {
//     field: "label",
//     headerName: "Categoria",
//     headerAlign: "left",
//     headerClassName: "text-xs text-muted-foreground font-bold",
//     editable: true,
//     type: "number",
//     disableColumnMenu: true,
//     flex: 1,
//     renderCell: (params) => {
//       return (
//         <div className="flex space-x-2">
//           <span>
//             {params.row.type === TransactionType.EXPENSE && "-"}
//             {formatCurrency(params.value)}
//           </span>
//         </div>
//       );
//     },
//   },
//   // {
//   //   field: "actions",
//   //   headerName: "",
//   //   maxWidth: 55,
//   //   flex: 1,
//   //   sortable: false,
//   //   editable: false,
//   //   filterable: false,
//   //   resizable: false,
//   //   disableColumnMenu: true,
//   //   renderCell: (params) => {
//   //     return <DataTableRowActions data={params.row} />;
//   //   },
//   // },
// ];
