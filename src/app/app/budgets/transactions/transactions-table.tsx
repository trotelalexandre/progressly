"use client";
import "client-only";
import { getTransactionColumns } from "./transaction-columns";
import { Categories, Transactions } from "@/types/budget";
import { DataTable } from "@/components/ui/data-table";

interface TransactionsTableProps {
  categories: Categories;
  transactions: Transactions;
}

export default function TransactionsTable({
  categories,
  transactions,
}: TransactionsTableProps) {
  const transactionColumns = getTransactionColumns(categories);

  return <DataTable columns={transactionColumns} data={transactions} />;
}
