"use client";

import * as React from "react";
import { addDays, format } from "date-fns";

import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Calendar } from "./ui/calendar";
import { DateRange } from "react-day-picker";
import { ptBR } from "date-fns/locale";
import { useUser } from "@/hooks/use-user";
import { useRouter } from "next/navigation";
import { PopoverClose } from "@radix-ui/react-popover";
import { useDashboard } from "@/hooks/use-dashboard";

interface Props {
  handleSelect: (range: DateRange | undefined) => void;
}

export function DateRangePicker({
  className,
  handleSelect,
}: Props & React.HTMLAttributes<HTMLDivElement>) {
  const { dateRange: date, setDateRange: setDate } = useDashboard();

  const router = useRouter();
  return (
    <div className={cn("grid gap-2", className)}>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            type="button"
            id="date"
            variant={"outline"}
            className={cn(
              "w-[260px] justify-start text-left font-normal",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, "LLL dd, y", { locale: ptBR })} -{" "}
                  {format(date.to, "LLL dd, y", { locale: ptBR })}
                </>
              ) : (
                format(date.from, "LLL dd, y")
              )
            ) : (
              <span>Escolha uma data</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="end">
          <Calendar
            initialFocus
            mode="range"
            locale={ptBR}
            defaultMonth={date?.from}
            selected={date}
            onSelect={(range) => {
              if (range) {
                handleSelect(range);
                setDate(range);
              }
            }}
            numberOfMonths={2}
          />

          <div className="flex justify-end">
            <PopoverClose>
              <Button className="m-3" onClick={() => router.refresh()}>
                Atualizar
              </Button>
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
