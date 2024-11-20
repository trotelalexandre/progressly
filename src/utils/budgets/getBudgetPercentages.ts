export const getBudgetPercentages = (
  totalIncome: number,
  totalExpense: number
) => {
  const remainingBudget = totalIncome - totalExpense;
  const usedBudgetPercentage = Math.min(
    100,
    Math.floor((totalExpense / totalIncome) * 100)
  );
  const remainingBudgetPercentage =
    remainingBudget <= 0
      ? 0
      : Math.min(100, Math.floor((remainingBudget / totalIncome) * 100));

  return { remainingBudgetPercentage, usedBudgetPercentage };
};
