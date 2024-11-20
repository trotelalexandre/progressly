import lodash from "lodash";

type Transaction = {
  date: Date;
  category: string;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};

export const getUniqueTransactionsDaysCount = (transactions: Transaction[]) => {
  const uniqueTransactionDaysCount = lodash.uniq(
    transactions.map((transaction) => new Date(transaction.date).getDate())
  ).length;

  return uniqueTransactionDaysCount;
};
