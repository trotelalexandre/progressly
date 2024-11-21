"use client";
import "client-only";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams, useRouter } from "next/navigation";

type Params = {
  month: string;
  year: string;
};

export function MonthYearPicker() {
  const router = useRouter();
  const params: Params = useParams();

  const [activeMonth, setActiveMonth] = useState<number>(
    params?.month ? parseInt(params.month, 10) : new Date().getMonth() + 1
  );
  const [activeYear, setActiveYear] = useState<number>(
    params?.year ? parseInt(params.year, 10) : new Date().getFullYear()
  );

  useEffect(() => {
    if (params.month && params.year) {
      setActiveMonth(parseInt(params.month, 10));
      setActiveYear(parseInt(params.year, 10));
    }
  }, [params]);

  const navigateToNewDate = (newMonth: number, newYear: number) => {
    setActiveMonth(newMonth);
    setActiveYear(newYear);

    router.push(`/app/budgets/${newMonth}/${newYear}`);
  };

  const handleMonthChange = (value: string) => {
    const newMonth = parseInt(value, 10);
    navigateToNewDate(newMonth, activeYear);
  };

  const handleYearChange = (value: string) => {
    const newYear = parseInt(value, 10);
    navigateToNewDate(activeMonth, newYear);
  };

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
