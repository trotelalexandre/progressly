import { MonthYearParams } from "@/types/params";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export const useMonthYear = () => {
  const router = useRouter();
  const params: MonthYearParams = useParams();

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

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const newMonth = parseInt(value, 10);
    navigateToNewDate(newMonth, activeYear);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;

    const newYear = parseInt(value, 10);
    navigateToNewDate(activeMonth, newYear);
  };

  return {
    activeMonth,
    activeYear,
    handleMonthChange,
    handleYearChange,
  };
};
