/**
 * Returns the percentage of the budget used and the percentage of the budget remaining.
 *
 * @param totalIncome The total income.
 * @param totalExpense The total expense.
 * @returns The percentage of the budget used and the percentage of the budget remaining.
 */
export const getBudgetPercentages = (
  totalIncome: number,
  totalExpense: number
) => {
  const remainingBudget = totalIncome - totalExpense;
  const usedBudgetPercentage =
    totalIncome > 0
      ? Math.min(100, Math.floor((totalExpense / totalIncome) * 100))
      : 0;
  const remainingBudgetPercentage =
    remainingBudget <= 0
      ? 0
      : Math.min(100, Math.floor((remainingBudget / totalIncome) * 100));

  return { remainingBudgetPercentage, usedBudgetPercentage };
};
