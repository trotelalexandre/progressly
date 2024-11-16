"use client";
import "client-only";

import { useState } from "react";
import { DatePicker } from "@/components/ui/date-picker";

export default function DatePickerBudget() {
  const [date, setDate] = useState<Date>();

  return <DatePicker date={date} setDate={setDate} />;
}
