"use client";
import "client-only";

import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import lodash from "lodash";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { TrendingDown, TrendingUp } from "lucide-react";
import { eachDayOfInterval, format } from "date-fns";
import { getSpentChart } from "@/utils/budgets/charts/getSpentChart";
import { getUniqueTransactionsDaysCount } from "@/utils/budgets/getUniqueTransactionsDaysCount";

const chartConfig = {
  spent: {
    label: "Total spent",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

type Transaction = {
  date: Date;
  category: string;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};

interface SpentChartProps {
  transactions: Transaction[];
}

export default function SpentChart({ transactions }: SpentChartProps) {
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

  const { chartData, trend } = getSpentChart(transactions);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Spent Progress</CardTitle>
        <CardDescription>Spending progress day by day</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="mx-auto max-h-[350px]">
          <LineChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={(value) => value.slice(8)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Line
              dataKey="spent"
              type="natural"
              stroke="var(--color-spent)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 font-medium leading-none">
          Trending {trend > 0 ? "up" : "down"} by {Math.abs(Math.round(trend))}%{" "}
          today compared to yesterday{" "}
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
