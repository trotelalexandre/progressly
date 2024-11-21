import { ExpensesByType } from "@/types/budget";

/**
 * Returns the total income and expense.
 *
 * @param expensesByType The expenses by type.
 * @returns The total income and expense.
 */
export const getTotalIncomeAndExpense = (expensesByType: ExpensesByType) => {
  if (!expensesByType || !Object.keys(expensesByType).length) {
    return { totalIncome: 0, totalExpense: 0 };
  }

  const totalIncome = expensesByType["income"] ?? 0;
  const totalExpense =
    (expensesByType["essential"] ?? 0) +
    (expensesByType["lifestyle"] ?? 0) +
    (expensesByType["investment"] ?? 0);

  return { totalIncome, totalExpense };
};
