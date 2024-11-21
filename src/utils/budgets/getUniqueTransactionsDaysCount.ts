import { Transactions } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the unique transactions days count.
 *
 * @param transactions The transactions.
 * @returns The unique transactions days count.
 */
export const getUniqueTransactionsDaysCount = (transactions: Transactions) => {
  const uniqueTransactionDaysCount = lodash.uniq(
    transactions.map((transaction) => new Date(transaction.date).getDate())
  ).length;

  return uniqueTransactionDaysCount;
};
