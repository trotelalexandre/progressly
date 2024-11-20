/**
 * Get remaining budget and progress value
 *
 * @param totalIncome The total income
 * @param expense The expense
 * @param percentage The percentage
 * @returns The remaining budget and progress value
 */
export const getRemainingBudget = (
  totalIncome: number,
  expense: number,
  percentage: number
) => {
  const remainingBudget =
    totalIncome * percentage - expense < 0
      ? 0
      : totalIncome * percentage - expense;
  const progressValue =
    ((totalIncome * percentage - remainingBudget) /
      (totalIncome * percentage)) *
    100;

  return { remainingBudget, progressValue };
};
