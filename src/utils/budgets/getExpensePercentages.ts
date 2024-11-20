import { ExpensesByType } from "@/types/budget";

export const getExpensePercentages = (
  expensesByType: ExpensesByType,
  totalExpense: number
) => {
  if (!totalExpense) {
    return {
      essentialPercentage: 0,
      lifestylePercentage: 0,
      investmentPercentage: 0,
    };
  }

  const essentialPercentage = Math.floor(
    (expensesByType["essential"] / totalExpense) * 100
  );
  const lifestylePercentage = Math.floor(
    (expensesByType["lifestyle"] / totalExpense) * 100
  );
  const investmentPercentage = Math.floor(
    (expensesByType["investment"] / totalExpense) * 100
  );

  return { essentialPercentage, lifestylePercentage, investmentPercentage };
};
