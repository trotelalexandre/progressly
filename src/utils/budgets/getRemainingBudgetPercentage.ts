export const getRemainingBudgetPercentage = (
  totalIncome: number,
  totalExpense: number
) => {
  if (!totalIncome) {
    return 0;
  }

  return Math.floor(((totalIncome - totalExpense) / totalIncome) * 100);
};
