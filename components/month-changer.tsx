"use client";

import React, { useState } from "react";
import { Button } from "./ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format, addMonths, subMonths } from "date-fns";
import { ptBR } from "date-fns/locale";
import { capitalizeText } from "@/lib/utils";

export default function MonthChanger() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleCurrentMonth = () => {
    setCurrentDate(new Date());
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
