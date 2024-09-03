"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { Search, X } from "lucide-react";
import { DataTableViewOptions } from "./data-table-view-options";
import { AdornedInput } from "@/components/adorned-input";

interface DataTableToolbarProps<TData> {
  // table: Table<TData>;
  // labels: {
  //   id: string;
  //   title: string;
  //   hexColor: string;
  // }[];
}

export function DataTableToolbar<TData>({}: // labels,
DataTableToolbarProps<TData>) {
  // const isFiltered = table.getState().columnFilters.length > 0;
  return (
    <div className="flex items-center justify-between border-b pb-2 px-3">
      <div className="flex flex-1 items-center space-x-2">
        <AdornedInput
          adornment={<Search className="h-4 w-4" />}
          placeholder="Buscar movimentações..."
          className="h-8 w-[150px] lg:w-[550px] border-none focus-visible:ring-transparent"
          // value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          // onChange={(event) =>
          //   table.getColumn("title")?.setFilterValue(event.target.value)
          // }
        />
        {/* {table.getColumn("labels") && (
          <DataTableFacetedFilter
            column={table.getColumn("labels")}
            title="Label"
            options={labels}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )} */}
      </div>
      <DataTableViewOptions />
    </div>
  );
}
