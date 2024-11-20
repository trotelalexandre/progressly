import { Categories } from "@/types/budget";
import AddTransaction from "./transactions/add-transaction";
import Transactions from "./transactions/transactions";
import FrameworkHelp from "./transactions/framework-help";

interface TransactionsTabProps {
  userId: string;
  categories: Categories;
}

export default async function TransactionsTab({
  userId,
  categories,
}: TransactionsTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddTransaction categories={categories} />
        <FrameworkHelp />
      </div>
      <Transactions userId={userId} categories={categories} />
    </div>
  );
}
