"use client";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { columns } from "./columns";
import { Transaction } from "@/dto/types";
import { ptBR } from "@mui/x-data-grid/locales";
import { DataTableToolbar } from "./data-table-toolbar";
import NoRowsOverlay from "./no-rows-overlay";

interface DataTableProps {
  data: Transaction[];
  loading: boolean;
}

export function TransactionsDataTable({ data, loading }: DataTableProps) {
  return (
    <div className="space-y-4">
      <DataTableToolbar />
      <div className={`rounded-md ${data.length === 0 && "h-[500px]"}`}>
        <DataGrid
          loading={loading}
          rows={data}
          columns={columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 20,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
          showCellVerticalBorder
          columnHeaderHeight={45}
          rowHeight={45}
          sx={{
            border: "1",
            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]:
              {
                outlineColor: "hsl(var(--primary))",
              },
            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
              {
                outline: "none",
              },
            [`& .${gridClasses.columnSeparator}`]: {
              [`&:not(.${gridClasses["columnSeparator--resizable"]})`]: {
                display: "none",
              },
            },
            "& .Mui-selected": {
              backgroundColor: "hsl(var(--primary-light)) !important",
            },
            "& .Mui-checked": {
              color: "hsl(var(--primary))",
            },
          }}
          slotProps={{
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          slots={{
            noRowsOverlay: NoRowsOverlay,
          }}
        />
      </div>
    </div>
  );
}
