import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

import { fetchThisMonthTransactions } from "@/utils/db/budgets/thisMonthTransactions";
import { DataTable } from "@/components/ui/data-table";
import { getTransactionColumns } from "./transaction-columns";
import { Categories } from "@/types/budget";
import TransactionsTable from "./transactions-table";

interface TransactionsProps {
  userId: string;
  categories: Categories;
}

export default async function Transactions({
  userId,
  categories,
}: TransactionsProps) {
  const transactions = await fetchThisMonthTransactions.execute({ userId });

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
