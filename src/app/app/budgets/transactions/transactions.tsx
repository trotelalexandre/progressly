import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Categories } from "@/types/budget";
import TransactionsTable from "./transactions-table";
import { fetchMonthlyTransactions } from "@/utils/db/budgets/monthlyTransactions";

interface TransactionsProps {
  userId: string;
  categories: Categories;
  activeMonth: number;
  activeYear: number;
}

export default async function Transactions({
  userId,
  categories,
  activeMonth,
  activeYear,
}: TransactionsProps) {
  const transactions = await fetchMonthlyTransactions.execute({
    userId,
    activeMonth,
    activeYear,
  });

  if (!transactions || !transactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>0 transactions this month</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 h-48 items-center justify-center text-center">
          <p className="text-sm text-muted-foreground">
            Nothing to show yet...
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Transactions</CardTitle>
        <CardDescription>
          {transactions.length} transactions this month
        </CardDescription>
      </CardHeader>
      <CardContent>
        <TransactionsTable
          categories={categories}
          transactions={transactions}
        />
      </CardContent>
    </Card>
  );
}
