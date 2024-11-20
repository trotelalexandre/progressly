import { CategoriesByType, Transactions } from "@/types/budget";
import lodash from "lodash";

export const getTransactionsByType = (
  transactions: Transactions,
  categoriesByType: CategoriesByType
) => {
  const transactionsByType = lodash.mapValues(categoriesByType, (categories) =>
    lodash.flatMap(categories, (category) =>
      transactions.filter(
        (transaction) => transaction.category === category.name
      )
    )
  );

  return transactionsByType;
};
