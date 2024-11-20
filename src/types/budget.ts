import { Dictionary } from "lodash";

export type Category = {
  type: string;
  name: string;
};

export type Categories = Category[];

export type CategoriesByType = Dictionary<Categories>;

export type ExpensesByCategory = { [key: string]: number };

export type ExpensesByType = {
  [x: string]: number;
};

export type Transaction = {
  date: Date;
  category: string;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};

export type Transactions = Transaction[];

export type TransactionsByCategories = Dictionary<Transactions>;
