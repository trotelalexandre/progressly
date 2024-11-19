"use client";

import React, { useState, ChangeEvent } from "react";
import { Input } from "@/components/ui/input";

interface CurrencyInputProps {
  currencySymbol?: string;
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
}

export default function CurrencyInput({
  currencySymbol = "$",
  value = "",
  onChange,
  placeholder = "0.00",
}: CurrencyInputProps) {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/[^0-9.]/g, "");
    const parts = rawValue.split(".");
    let formattedValue = parts[0];

    if (parts.length > 1) {
      formattedValue += "." + parts[1].slice(0, 2);
    }

    setInputValue(formattedValue);
    onChange && onChange(formattedValue);
  };

  return (
    <div className="relative">
      <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
        <span className="text-gray-500 sm:text-sm">{currencySymbol}</span>
      </div>
      <Input
        type="text"
        value={inputValue}
        onChange={handleChange}
        className="pl-7 pr-3 text-right"
        placeholder={placeholder}
        aria-label="Currency input"
      />
    </div>
  );
}
