import { CategoriesByType, Transactions } from "@/types/budget";
import { getTransactionsByType } from "./getTransactionsByType";

/**
 * Returns the expense transactions.
 *
 * @param transactions The transactions.
 * @param categoriesByType The categories by type.
 * @returns The expense transactions.
 */
export const getExpenseTransactions = (
  transactions: Transactions,
  categoriesByType: CategoriesByType
) => {
  const transactionsByType = getTransactionsByType(
    transactions,
    categoriesByType
  );

  delete transactionsByType["income"];
  delete transactionsByType["investment"];

  const expenseTransactions = Object.values(transactionsByType).flat();

  return expenseTransactions;
};
