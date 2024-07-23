"use client";

import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeText } from "@/lib/utils";
import { useBudget } from "@/hooks/use-budget";

export default function MonthChanger() {
  const { period, setPeriod } = useBudget();
  const getCurrentDate = () => new Date(period[1], period[0] - 1);

  const currentDate = getCurrentDate();

  const handlePreviousMonth = () => {
    const newDate = subMonths(currentDate, 1);
    setPeriod([newDate.getMonth() + 1, newDate.getFullYear()]);
  };

  const handleNextMonth = () => {
    const newDate = addMonths(currentDate, 1);
    setPeriod([newDate.getMonth() + 1, newDate.getFullYear()]);
  };

  const handleCurrentMonth = () => {
    const today = new Date();
    setPeriod([today.getMonth() + 1, today.getFullYear()]);
  };

  return (
    <div className="flex flex-row items-center gap-2 text-muted-foreground">
      <Button
        onClick={handlePreviousMonth}
        variant="outline"
        className="h-8 w-8 p-0"
      >
        <ChevronLeft size={16} />
      </Button>
      <p className="text-md font-semibold text-center w-36">
        {capitalizeText(format(currentDate, "MMMM yyyy", { locale: ptBR }))}{" "}
      </p>
      <Button
        onClick={handleNextMonth}
        variant="outline"
        className="h-8 w-8 p-0"
      >
        <ChevronRight size={16} />
      </Button>
      <Button onClick={handleCurrentMonth} variant="outline" className="h-8">
        Mês atual
      </Button>
    </div>
  );
}
