import { Transactions } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the transactions grouped by category.
 *
 * @param transactions The transactions.
 * @returns The transactions grouped by category.
 */
export const getTransactionsByCategory = (transactions: Transactions) => {
  const transactionsByCategory = lodash.groupBy(transactions, "category");
  return transactionsByCategory;
};
