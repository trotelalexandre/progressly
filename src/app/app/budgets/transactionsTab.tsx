import AddTransaction from "./transactions/add-transaction";
import Transactions from "./transactions/transactions";

type Category = {
  name: string;
  type: string;
};

interface TransactionsTabProps {
  userId: string;
  categories: Category[];
}

export default function TransactionsTab({
  userId,
  categories,
}: TransactionsTabProps) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <AddTransaction userId={userId} categories={categories} />
      </div>
      <Transactions userId={userId} />
    </div>
  );
}
