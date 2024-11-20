"use client";
import "client-only";

import { LabelList, Pie, PieChart } from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCategoriesChart } from "@/utils/budgets/charts/getCategoriesChart";
import { Dictionary } from "lodash";
import { Categories } from "@/types/budget";

interface CategoriesChartProps {
  expensesByCategory: { [key: string]: number };
  categoriesByType: Dictionary<Categories>;
}

export default function CategoriesChart({
  expensesByCategory,
  categoriesByType,
}: CategoriesChartProps) {
  if (!Object.keys(expensesByCategory)?.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Spending by category</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 h-[350px] items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Nothing to show yet...
          </p>
        </CardContent>
      </Card>
    );
  }

  const { chartData, chartConfig } = getCategoriesChart(
    expensesByCategory,
    categoriesByType
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Spending by category</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[350px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey="spent" nameKey="category">
              <LabelList
                dataKey="category"
                className="fill-background"
                stroke="none"
                fontSize={12}
                formatter={(value: keyof typeof chartConfig) =>
                  chartConfig[value]?.label
                }
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="leading-none text-muted-foreground">
          Showing your top 5 categories by spending for the current month
        </div>
      </CardFooter>
    </Card>
  );
}
