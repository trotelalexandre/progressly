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
  const validTotalIncome = Math.max(totalIncome, 0);
  const validTotalExpense = Math.max(totalExpense, 0);

  const remainingBudget = totalIncome - totalExpense;

  const remainingBudgetPercentage =
    remainingBudget <= 0
      ? 0
      : Math.min(100, Math.floor((remainingBudget / validTotalIncome) * 100));
  const usedBudgetPercentage = 100 - remainingBudgetPercentage;

  return { remainingBudgetPercentage, usedBudgetPercentage };
};
