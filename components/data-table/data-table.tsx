"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  Row,
  useReactTable,
  Table as ReactTable,
  VisibilityState,
  SortingState,
  ColumnFiltersState,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Dispatch, ReactNode, SetStateAction, useState } from "react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
  FileSpreadsheet,
  Plus,
  Search,
  X,
} from "lucide-react";
import { DataTableContext, useDataTable } from "@/hooks/use-data-table";
import { Button } from "../ui/button";
import { AdornedInput } from "../adorned-input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import AddTransactionForm from "../forms/add-transaction-form";
import { Label } from "@prisma/client";
import { useImportTransactions } from "@/hooks/use-import-transactions";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  labels?: Label[];
  showFilterRow: boolean;
  showPagination: boolean;
  headerContent: ReactNode;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showFilterRow,
  showPagination,
  headerContent,
  labels,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(15);
  const [creating, setCreating] = useState(false);
  console.log(data);
  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <DataTableContext.Provider value={table}>
      <div>
        {showFilterRow && (
          <DataTableFilterRow handleCreatingRow={setCreating}>
            {headerContent}
          </DataTableFilterRow>
        )}

        {creating && (
          <div className="flex flex-row items-center gap-0 w-full px-4">
            <AddTransactionForm
              className="w-full"
              labels={labels ?? []}
              dialog={false}
            />
            <Button
              type="button"
              variant={"ghost"}
              size={"sm"}
              className="ml-2"
              onClick={() => setCreating(false)}
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        )}

        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                className="text-xs hover:bg-transparent"
                key={headerGroup.id}
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead className="px-6" key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row: Row<TData>) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell className="px-6" key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        {showPagination && (
          <DataTablePagination
            table={table}
            pageIndex={pageIndex}
            pageSize={pageSize}
            setPageIndex={setPageIndex}
            setPageSize={setPageSize}
          />
        )}
      </div>
    </DataTableContext.Provider>
  );
}

interface OptionsProps {
  children: ReactNode;
  handleCreatingRow: Dispatch<SetStateAction<boolean>>;
}

export function DataTableFilterRow({
  children,
  handleCreatingRow,
}: OptionsProps) {
  const table = useDataTable();
  const { setIsOpen } = useImportTransactions();

  return (
    <div className="px-4 py-1 border-b flex flex-row items-center justify-between">
      <AdornedInput
        adornment={<Search className="h-4 w-4" />}
        placeholder="Buscar movimentações..."
        value={(table?.getColumn("title")?.getFilterValue() as string) ?? ""}
        onChange={(event) =>
          table?.getColumn("title")?.setFilterValue(event.target.value)
        }
        className="max-w-sm border-none bg-transparent focus-visible:ring-offset-0 focus-visible:ring-transparent"
      />

      <div className="flex flex-row items-center gap-2">
        {children}
        <Button onClick={() => setIsOpen(true)} size={"sm"} variant={"outline"}>
          <FileSpreadsheet className="w-4 h-4 mr-2 text-muted-foreground" />
          Importar
        </Button>
        <Button
          size={"sm"}
          variant={"outline"}
          onClick={() => handleCreatingRow(true)}
        >
          <Plus className="w-4 h-4 mr-2 text-muted-foreground" />
          Novo
          {/* <kbd className="border rounded-md ml-2 px-2 text-[0.6rem]">
            Alt + N
          </kbd> */}
        </Button>
      </div>
    </div>
  );
}

interface PaginationProps<TData> {
  table: ReactTable<TData>;
  pageIndex: number;
  pageSize: number;
  editablePageSize?: boolean;
  setPageIndex: Dispatch<SetStateAction<number>>;
  setPageSize: Dispatch<SetStateAction<number>>;
}

export function DataTablePagination<TData>({
  table,
  pageIndex,
  pageSize,
  setPageIndex,
  setPageSize,
  editablePageSize,
}: PaginationProps<TData>) {
  const filteredRowsLength = table.getFilteredSelectedRowModel().rows.length;
  return (
    <div
      className={`flex items-center ${
        filteredRowsLength > 0 ? "justify-between" : "justify-end"
      } px-6 py-4 border-t`}
    >
      {filteredRowsLength > 0 && (
        <div className="flex-1 text-sm text-muted-foreground">
          {filteredRowsLength} de {table.getFilteredRowModel().rows.length}{" "}
          linha(s) selecionada(s).
        </div>
      )}
      <div className="flex items-center space-x-6 lg:space-x-8">
        {editablePageSize && (
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Linhas por página</p>
            <Select
              value={`${table.getState().pagination.pageSize}`}
              onValueChange={(value) => {
                table.setPageSize(Number(value));
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue
                  placeholder={table.getState().pagination.pageSize}
                />
              </SelectTrigger>
              <SelectContent side="top">
                {[10, 20, 30, 40, 50].map((pageSize) => (
                  <SelectItem key={pageSize} value={`${pageSize}`}>
                    {pageSize}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <div className="flex w-[100px] items-center justify-center text-sm font-medium">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(0)}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para primeira página</span>
            <ChevronsLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.previousPage();
              setPageIndex((prevState) => (prevState = prevState - 1));
            }}
            disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Ir para página anterior</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => {
              table.nextPage();
              setPageIndex((prevState) => (prevState = prevState + 1));
            }}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para próxima página</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setPageIndex(table.getPageCount() - 1)}
            disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Ir para última página</span>
            <ChevronsRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
