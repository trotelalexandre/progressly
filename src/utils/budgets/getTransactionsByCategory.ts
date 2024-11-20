import lodash from "lodash";

type Transaction = {
  category: string;
  date: Date;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};

export const getTransactionsByCategory = (transactions: Transaction[]) => {
  const transactionsByCategory = lodash.groupBy(transactions, "category");
  return transactionsByCategory;
};
