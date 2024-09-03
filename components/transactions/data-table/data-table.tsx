"use client";

import { DataGrid, gridClasses } from "@mui/x-data-grid";
import { columns } from "./columns";
import { ptBR } from "@mui/x-data-grid/locales";
import { DataTableToolbar } from "./data-table-toolbar";
import { Transaction } from "@prisma/client";
import { Checkbox, checkboxClasses } from "@mui/material";

interface DataTableProps {
  data: Transaction[];
}

export function TransactionsDataTable({ data }: DataTableProps) {
  return (
    <div>
      <DataTableToolbar />
      <div>
        <DataGrid
          rows={data}
          columns={columns}
          localeText={ptBR.components.MuiDataGrid.defaultProps.localeText}
          disableRowSelectionOnClick
          showCellVerticalBorder
          columnHeaderHeight={35}
          initialState={{
            pagination: { paginationModel: { pageSize: 15 } },
          }}
          // pageSizeOptions={[5, 10, 25]}
          // checkboxSelection
          rowHeight={45}
          sx={{
            border: "none",
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
            baseCheckbox: (props) => (
              <Checkbox
                {...props}
                sx={{
                  [`&, &.${checkboxClasses.checked}`]: {
                    color: "hsl(var(--primary))",
                  },
                }}
              />
            ),
          }}
        />
      </div>
    </div>
  );
}
