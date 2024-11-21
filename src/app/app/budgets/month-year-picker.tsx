"use client";
import "client-only";

import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMonthYear } from "./use-month-year";

export function MonthYearPicker() {
  const { activeMonth, activeYear, handleMonthChange, handleYearChange } =
    useMonthYear();

  const months = Array.from({ length: 12 }, (_, i) =>
    new Date(0, i).toLocaleString("default", { month: "long" })
  );

  const years = Array.from(
    { length: 10 },
    (_, i) => new Date().getFullYear() - i
  );

  return (
    <div className={`flex items-center space-x-2`}>
      <Select value={activeMonth.toString()} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue placeholder="Month" />
        </SelectTrigger>
        <SelectContent>
          {months.map((monthName, index) => (
            <SelectItem key={monthName} value={index.toString()}>
              {monthName}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={activeYear.toString()} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Year" />
        </SelectTrigger>
        <SelectContent>
          {years.map((yearValue) => (
            <SelectItem key={yearValue} value={yearValue.toString()}>
              {yearValue}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
