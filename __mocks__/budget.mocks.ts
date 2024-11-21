import {
  Categories,
  CategoriesByType,
  ExpensesByCategory,
  ExpensesByType,
  TransactionsByCategories,
} from "@/types/budget";

export const mockCategories: Categories = [
  { name: "Groceries", type: "essential" },
  { name: "Rent", type: "essential" },
  { name: "Secondary", type: "income" },
  { name: "Primary", type: "income" },
];

export const mockCategoriesByType: CategoriesByType = {
  essential: [
    { name: "Groceries", type: "essential" },
    { name: "Rent", type: "essential" },
  ],
  investment: [{ name: "Savings", type: "investment" }],
  income: [
    { name: "Secondary", type: "income" },
    { name: "Primary", type: "income" },
  ],
};

export const mockExpensesByType: ExpensesByType = {
  essential: 100,
  investment: 200,
  lifestyle: 300,
  income: 400,
};

export const mockTotalExpense: number = 600;
export const mockTotalIncome: number = 1000;

export const mockTransactionsByCategories: TransactionsByCategories = {
  Groceries: [
    {
      amount: "100",
      category: "Groceries",
      currency: "USD",
      date: new Date("2021-01-01"),
      id: 1,
      is_archived: false,
      note: "Groceries",
    },
  ],
  Rent: [
    {
      amount: "200",
      category: "Rent",
      currency: "USD",
      date: new Date("2021-01-01"),
      id: 2,
      is_archived: false,
      note: "Rent",
    },
    {
      amount: "200",
      category: "Rent",
      currency: "USD",
      date: new Date("2021-01-01"),
      id: 3,
      is_archived: false,
      note: "Rent",
    },
  ],
  Secondary: [
    {
      amount: "500",
      category: "Secondary",
      currency: "USD",
      date: new Date("2021-01-01"),
      id: 4,
      is_archived: false,
      note: "Secondary",
    },
  ],
};

export const mockExpensesByCategory: ExpensesByCategory = {
  Groceries: 100,
  Savings: 400,
  Secondary: 500,
};

export const mockTransactions = [
  {
    amount: "100",
    category: "Groceries",
    currency: "USD",
    date: new Date("2021-01-01"),
    id: 1,
    is_archived: false,
    note: "Groceries",
  },
  {
    amount: "200",
    category: "Rent",
    currency: "USD",
    date: new Date("2021-01-02"),
    id: 2,
    is_archived: false,
    note: "Rent",
  },
  {
    amount: "200",
    category: "Rent",
    currency: "USD",
    date: new Date("2021-01-01"),
    id: 3,
    is_archived: false,
    note: "Rent",
  },
  {
    amount: "500",
    category: "Secondary",
    currency: "USD",
    date: new Date("2021-01-01"),
    id: 4,
    is_archived: false,
    note: "Secondary",
  },
];
