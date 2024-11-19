import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { db } from "@/db/db";
import { budget_transactions } from "@/db/schema/budgets";
import { format } from "date-fns";
import { and, desc, eq } from "drizzle-orm";

export default async function Transactions({ userId }: { userId: string }) {
  const transactions = await db.query.budget_transactions.findMany({
    columns: {
      id: true,
      category: true,
      amount: true,
      currency: true,
      date: true,
      is_archived: true,
    },
    where: and(
      eq(budget_transactions.user_id, userId),
      eq(budget_transactions.is_archived, false)
    ),
    orderBy: [desc(budget_transactions.date)],
  });

  if (!transactions || !transactions.length) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Recent transactions</CardDescription>
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
        <CardDescription>Recent transactions</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Currency</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions?.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>
                  {format(new Date(transaction.date), "PPP")}
                </TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell>{transaction.amount}</TableCell>
                <TableCell>{transaction.currency}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
