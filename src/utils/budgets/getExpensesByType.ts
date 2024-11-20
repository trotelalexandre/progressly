import lodash, { Dictionary } from "lodash";

type Category = {
  type: string;
  name: string;
};
type CategoriesByType = Dictionary<Category[]>;

type ExpensesByCategory = {
  [x: string]: number;
};

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
