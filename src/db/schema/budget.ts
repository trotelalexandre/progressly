import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  pgPolicy,
  uuid,
  numeric,
  timestamp,
  index,
  integer,
  text,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { users } from "./auth";
import { currency } from "./currency";
import { timestamps } from "./timestamps";

export const transaction_types = pgTable(
  "transaction_types",
  {
    id: serial("id").primaryKey(),
    name: text("type").notNull(), // income, expense, investment
    ...timestamps,
  },
  (table) => ({
    pgPolicy: pgPolicy("authenticated users can read transaction types", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`true`,
    }),
  })
);

export const transaction_categories = pgTable(
  "transaction_categories",
  {
    id: serial("id").primaryKey(),
    name: text("category").notNull(), // groceries, rent, etc
    type_id: serial("type_id")
      .notNull()
      .references(() => transaction_types.id), // income, expense, investment
    emoji: text("emoji"), // emoji for the category
    ...timestamps,
  },
  (table) => ({
    pgPolicy: pgPolicy("authenticated users can read transaction categories", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`true`,
    }),
  })
);

export const income_transactions = pgTable(
  "income_transactions",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category_id: serial("category_id")
      .notNull()
      .references(() => transaction_categories.id, { onDelete: "cascade" }), // salary, bonus, etc
    amount: numeric("amount").notNull(), // amount of the transaction
    currency_id: serial("currency_id")
      .notNull()
      .references(() => currency.id), // USD, EUR, etc
    date: timestamp("date", { withTimezone: true }).defaultNow(), // date of the transaction
    ...timestamps,
  },
  (table) => ({
    idx_income_transactions_user_category_date: index(
      "idx_income_transactions_user_category_date"
    ).on(table.user_id, table.category_id, table.date),
    pgPolicy: pgPolicy("authenticated users can manage their own income", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);

export const expenses_transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(), // only expenses and investments
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category_id: serial("category_id")
      .notNull()
      .references(() => transaction_categories.id, { onDelete: "cascade" }), // groceries, rent, etc
    amount: numeric("amount").notNull(), // amount of the transaction
    currency_id: serial("currency_id")
      .notNull()
      .references(() => currency.id), // USD, EUR, etc
    date: timestamp("date", { withTimezone: true }).defaultNow(), // date of the transaction
    ...timestamps,
  },
  (table) => ({
    idx_transactions_user_category_date: index(
      "idx_transactions_user_category_date"
    ).on(table.user_id, table.category_id, table.date),
    pgPolicy: pgPolicy(
      "authenticated users can manage their own transactions",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "all",
        using: sql`${table.user_id} = current_user_id()`,
      }
    ),
  })
);

export const budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    month: integer("month").notNull(), // month of the budget period
    year: integer("year").notNull(), // year of the budget period
    income: numeric("income").notNull(), // total income for the month
    expenses: numeric("expenses").notNull(), // total expenses for the month (planned)
    investments: numeric("investments").notNull(), // total investments for the month (planned)
    ...timestamps,
  },
  (table) => ({
    idx_budgets_user_year_month: index("idx_budgets_user_year_month").on(
      table.user_id,
      table.year,
      table.month
    ),
    pgPolicy: pgPolicy("authenticated users can manage their own budgets", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);