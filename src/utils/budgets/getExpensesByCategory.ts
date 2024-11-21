import { TransactionsByCategories } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the expenses by category.
 *
 * @param transactionsByCategories The transactions grouped by categories.
 * @returns The expenses by category.
 */
export const getExpensesByCategory = (
  transactionsByCategories: TransactionsByCategories
) => {
  const expensesByCategory = lodash.mapValues(
    transactionsByCategories,
    (group) =>
      lodash.sumBy(group, (transaction) => parseFloat(transaction.amount))
  );

  return expensesByCategory;
};
