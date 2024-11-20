import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface IncomeVsExpensesProps {
  totalIncome: number;
  totalExpense: number;
  currency: string | undefined;
}

export default function IncomeVsExpenses({
  totalIncome,
  totalExpense,
  currency = "EUR",
}: IncomeVsExpensesProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income vs Expense</CardTitle>
        <CardDescription>Income and expense comparison</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium">Income</div>
            <div className="text-3xl font-bold">
              {totalIncome.toFixed(0)} {currency}
            </div>
          </div>
          <div>
            <div className="text-sm font-medium">Expense</div>
            <div className="text-3xl font-bold">
              {totalExpense.toFixed(0)} {currency}
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Progress value={(totalExpense / totalIncome) * 100} />
      </CardFooter>
    </Card>
  );
}
