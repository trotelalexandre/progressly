import { CategoriesByType, Transactions } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the transactions by type.
 *
 * @param transactions The transactions.
 * @param categoriesByType The categories by type.
 * @returns The transactions by type.
 */
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
