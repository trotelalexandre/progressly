import { ExpensesByType } from "@/types/budget";

/**
 * Returns the percentage of the expenses by type.
 *
 * @param expensesByType The expenses by type.
 * @param totalExpense The total expense.
 * @returns The percentage of the expenses by type.
 */
export const getExpensePercentages = (
  expensesByType: ExpensesByType,
  totalExpense: number
) => {
  if (!totalExpense || totalExpense <= 0) {
    return {
      essentialPercentage: 0,
      lifestylePercentage: 0,
      investmentPercentage: 0,
    };
  }

  const essentialPercentage = Math.max(
    0,
    Math.floor((expensesByType["essential"] / totalExpense) * 100)
  );
  const lifestylePercentage = Math.max(
    0,
    Math.floor((expensesByType["lifestyle"] / totalExpense) * 100)
  );
  const investmentPercentage = Math.max(
    0,
    Math.floor((expensesByType["investment"] / totalExpense) * 100)
  );

  return { essentialPercentage, lifestylePercentage, investmentPercentage };
};
