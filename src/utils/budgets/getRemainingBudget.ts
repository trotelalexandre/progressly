/**
 * Get remaining budget and progress value
 *
 * @param totalIncome The total income
 * @param expense The expense for this budget
 * @param percentage The percentage goal to take from the total income (ex: totalIncome * 0.5)
 * @returns The remaining budget and progress value
 */
export const getRemainingBudget = (
  totalIncome: number,
  expense: number,
  percentage: number
) => {
  const validTotalIncome = Math.max(totalIncome, 0);
  const validExpense = Math.max(expense, 0);
  const validPercentage = Math.max(percentage, 0);

  if (validTotalIncome <= 0 || validPercentage <= 0) {
    return { remainingBudget: 0, progressValue: 0 };
  }

  const remainingBudget =
    validTotalIncome * validPercentage - validExpense < 0
      ? 0
      : validTotalIncome * validPercentage - validExpense;
  const progressValue =
    ((validTotalIncome * validPercentage - remainingBudget) /
      (validTotalIncome * validPercentage)) *
    100;

  return { remainingBudget, progressValue };
};
