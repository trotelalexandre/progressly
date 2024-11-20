import { ChartConfig } from "@/components/ui/chart";

type ExpensesByCategory = { [key: string]: number };

export const getCategoriesChart = (expensesByCategory: ExpensesByCategory) => {
  const chartData = Object.keys(expensesByCategory)
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
