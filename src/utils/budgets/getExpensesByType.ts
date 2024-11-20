import { CategoriesByType, ExpensesByCategory } from "@/types/budget";
import lodash from "lodash";

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
