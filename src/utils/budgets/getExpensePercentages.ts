type ExpensesByType = {
  [x: string]: number;
};

export const getExpensePercentages = (
  expensesByType: ExpensesByType,
  totalExpense: number
) => {
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
