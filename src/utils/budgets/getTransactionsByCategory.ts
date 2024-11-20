import { Transactions } from "@/types/budget";
import lodash from "lodash";

export const getTransactionsByCategory = (transactions: Transactions) => {
  const transactionsByCategory = lodash.groupBy(transactions, "category");
  return transactionsByCategory;
};
