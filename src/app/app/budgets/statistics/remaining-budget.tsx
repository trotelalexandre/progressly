import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { getRemainingBudget } from "@/utils/budgets/getRemainingBudget";

interface RemainingBudgetProps {
  title: string;
  totalIncome: number;
  expense: number;
  currency: string | undefined;
  percentage: number;
}

export default async function RemainingBudget({
  title,
  totalIncome,
  expense,
  currency = "EUR",
  percentage,
}: RemainingBudgetProps) {
  const { remainingBudget, progressValue } = getRemainingBudget(
    totalIncome,
    expense,
    percentage
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>
          This is your remaining budget for this category.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-3xl font-bold">
          {remainingBudget.toFixed(0)} {currency}
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={progressValue} />
      </CardFooter>
    </Card>
  );
}
