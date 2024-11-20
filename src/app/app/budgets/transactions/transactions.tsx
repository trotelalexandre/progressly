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
import { fetchThisMonthTransactions } from "@/utils/db/budgets/thisMonthTransactions";
import { format } from "date-fns";

export default async function Transactions({ userId }: { userId: string }) {
  const transactions = await fetchThisMonthTransactions(userId);

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
