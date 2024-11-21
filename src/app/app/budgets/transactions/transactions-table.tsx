"use client";
import "client-only";

import { getTransactionColumns } from "./transaction-columns";
import { Categories, Transaction, Transactions } from "@/types/budget";
import { DataTable } from "@/components/ui/data-table";
import { useRef, useState } from "react";
import EditTransaction from "./edit-transaction";

interface TransactionsTableProps {
  categories: Categories;
  transactions: Transactions;
}

export default function TransactionsTable({
  categories,
  transactions,
}: TransactionsTableProps) {
  const [openEditTransactionDialog, setOpenEditTransactionDialog] =
    useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);

  const handleEditClick = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenEditTransactionDialog(true);
  };

  const transactionColumns = getTransactionColumns(categories, handleEditClick);

  return (
    <>
      <DataTable columns={transactionColumns} data={transactions} />
      <EditTransaction
        transaction={selectedTransaction}
        open={openEditTransactionDialog}
        onOpenChange={setOpenEditTransactionDialog}
        categories={categories}
      />
    </>
  );
}
