import { CategoriesByType, ExpensesByCategory } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the expenses by type.
 *
 * @param categoriesByType The categories by type.
 * @param expensesByCategory The expenses by category.
 * @returns The expenses by type.
 */
export const getExpensesByType = (
  categoriesByType: CategoriesByType,
  expensesByCategory: ExpensesByCategory
) => {
  const expensesByType = lodash.mapValues(categoriesByType, (categories) => {
    return lodash.sumBy(
      categories,
      (category) => expensesByCategory[category.name] ?? 0
    );
  });

  return expensesByType;
};
