import { ChartConfig } from "@/components/ui/chart";
import { getCategoriesToExclude } from "../getCategoriesToExclude";
import { CategoriesByType, ExpensesByCategory } from "@/types/budget";

/**
 * Returns the chart data and config for the categories chart.
 *
 * @param expensesByCategory The expenses by category.
 * @param categoriesByType The categories by type.
 * @returns The chart data and config for the categories chart.
 */
export const getCategoriesChart = (
  expensesByCategory: ExpensesByCategory,
  categoriesByType: CategoriesByType
) => {
  const categoriesToExclude = getCategoriesToExclude(categoriesByType);

  const chartData = Object.keys(expensesByCategory)
    .filter((category) => !categoriesToExclude.includes(category))
    .sort((a, b) => expensesByCategory[b] - expensesByCategory[a])
    .map((category, index) => ({
      category,
      spent: expensesByCategory[category],
      fill: `hsl(var(--chart-${index + 1}))`,
      label: category.charAt(0).toUpperCase() + category.slice(1),
    }))
    .filter((_, index) => index < 5);

  const chartConfig = chartData.reduce((acc, data) => {
    acc[data.category] = {
      label: data.label,
      color: data.fill,
    };
    return acc;
  }, {} as ChartConfig);

  return { chartData, chartConfig };
};
