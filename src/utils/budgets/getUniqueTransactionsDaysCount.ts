import { Transactions } from "@/types/budget";
import lodash from "lodash";

export const getUniqueTransactionsDaysCount = (transactions: Transactions) => {
  const uniqueTransactionDaysCount = lodash.uniq(
    transactions.map((transaction) => new Date(transaction.date).getDate())
  ).length;

  return uniqueTransactionDaysCount;
};
