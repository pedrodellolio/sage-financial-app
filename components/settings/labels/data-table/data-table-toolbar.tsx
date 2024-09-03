"use client";

import { Input } from "@/components/ui/input";
import { Table } from "@tanstack/react-table";
import { DataTableViewOptions } from "./data-table-view-options";
import { ProfileCombobox } from "@/components/navbar/profile-combobox";
import { Profile } from "@/dto/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSelectProfile = async (profile: Profile) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set("profile", profile.id);
    const search = current.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <ProfileCombobox handleSelection={handleSelectProfile} />
        <Input
          placeholder="Buscar categorias..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-9 w-[150px] lg:w-[250px]"
        />
      </div>
      <DataTableViewOptions />
    </div>
  );
}
