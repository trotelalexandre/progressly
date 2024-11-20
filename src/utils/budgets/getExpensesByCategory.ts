import lodash from "lodash";

type Transaction = {
  category: string;
  date: Date;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};
type TransactionsByCategories = lodash.Dictionary<Transaction[]>;

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
