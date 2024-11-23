"use client";
import "client-only";

import React from "react";
import { useMonthYear } from "./use-month-year";
import { SelectNative } from "@/components/ui/select-native";

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
      <SelectNative value={activeMonth.toString()} onChange={handleMonthChange}>
        {months.map((monthName, index) => (
          <option key={monthName} value={index.toString()}>
            {monthName}
          </option>
        ))}
      </SelectNative>
      <SelectNative value={activeYear.toString()} onChange={handleYearChange}>
        {years.map((yearValue) => (
          <option key={yearValue} value={yearValue.toString()}>
            {yearValue}
          </option>
        ))}
      </SelectNative>
    </div>
  );
}
