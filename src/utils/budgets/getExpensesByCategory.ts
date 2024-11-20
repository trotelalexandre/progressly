import { TransactionsByCategories } from "@/types/budget";
import lodash from "lodash";

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
