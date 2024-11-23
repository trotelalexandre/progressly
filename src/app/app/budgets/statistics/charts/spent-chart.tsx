"use client";
import "client-only";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { getSpentChart } from "@/utils/budgets/charts/getSpentChart";
import { getUniqueTransactionsDaysCount } from "@/utils/budgets/getUniqueTransactionsDaysCount";
import { Dictionary } from "lodash";
import { Categories, Transactions } from "@/types/budget";

const chartConfig = {
  spent: {
    label: "Total spent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

interface SpentChartProps {
  transactions: Transactions;
  categoriesByType: Dictionary<Categories>;
}

export default function SpentChart({
  transactions,
  categoriesByType,
}: SpentChartProps) {
  const uniqueTransactionDaysCount =
    getUniqueTransactionsDaysCount(transactions);

  if (uniqueTransactionDaysCount < 2) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Spent Progress</CardTitle>
          <CardDescription>Spending progress day by day</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 h-[350px] items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Nothing to show yet...
          </p>
        </CardContent>
      </Card>
    );
  }

  const { chartData, trend } = getSpentChart(transactions, categoriesByType);

  return (
    <Card>
      <CardHeader>
        <CardTitle>This Week&apos;s Spending</CardTitle>
        <CardDescription>Spending overview for the last week</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto max-h-[350px]">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="spent" fill="var(--color-spent)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          This is {Math.abs(Math.round(trend))}% {trend > 0 ? "more" : "less"}{" "}
          spent compared to yesterday
          {trend > 0 ? (
            <TrendingUp className="w-4 h-4" />
          ) : (
            <TrendingDown className="w-4 h-4" />
          )}
        </div>
        <div className="leading-none text-muted-foreground">
          Showing total spending for the active month
        </div>
      </CardFooter>
    </Card>
  );
}
