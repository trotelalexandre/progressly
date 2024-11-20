import { ChartConfig } from "@/components/ui/chart";
import { Dictionary } from "lodash";

type Category = {
  type: string;
  name: string;
};

type ExpensesByCategory = { [key: string]: number };
type CategoriesByType = Dictionary<Category[]>;

export const getCategoriesChart = (
  expensesByCategory: ExpensesByCategory,
  categoriesByType: CategoriesByType
) => {
  const categoriesToExclude = categoriesByType["income"]
    .concat(categoriesByType["investment"])
    .map((category) => category.name);

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
