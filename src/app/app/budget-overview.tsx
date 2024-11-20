import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank } from "lucide-react";

interface BudgetOverviewProps {
  totalIncome: number;
  totalExpense: number;
  remainingBudgetPercentage: number;
  currency: string;
}

export default async function BudgetOverview({
  totalIncome,
  totalExpense,
  remainingBudgetPercentage,
  currency,
}: BudgetOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Budget Overview</CardTitle>
        <PiggyBank className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">
          {totalExpense} {currency} / {totalIncome} {currency}
        </div>
        <p className="text-xs text-muted-foreground">
          {remainingBudgetPercentage}% of monthly budget used
        </p>
        <Progress value={remainingBudgetPercentage} className="mt-4" />
      </CardContent>
    </Card>
  );
}
