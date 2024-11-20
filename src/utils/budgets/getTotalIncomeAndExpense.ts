import { ExpensesByType } from "@/types/budget";

/**
 * Returns the total income and expense.
 *
 * @param expensesByType The expenses by type.
 * @returns The total income and expense.
 */
export const getTotalIncomeAndExpense = (expensesByType: ExpensesByType) => {
  const totalIncome = expensesByType["income"];
  const totalExpense =
    expensesByType["essential"] +
    expensesByType["lifestyle"] +
    expensesByType["investment"];

  return { totalIncome, totalExpense };
};
