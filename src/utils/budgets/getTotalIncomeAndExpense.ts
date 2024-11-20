import { ExpensesByType } from "@/types/budget";

export const getTotalIncomeAndExpense = (expensesByType: ExpensesByType) => {
  const totalIncome = expensesByType["income"] ?? 0;
  const totalExpense =
    expensesByType["essential"] +
    expensesByType["lifestyle"] +
    expensesByType["investment"];

  return { totalIncome, totalExpense };
};
