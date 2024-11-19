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
  boolean,
  check,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUsers as users } from "drizzle-orm/supabase";
import { timestamps } from "./timestamps";
import { currency } from "./currency";

export const transaction_types = pgTable(
  "transaction_types",
  {
    name: text("type").primaryKey(), // income, expense, investment
    ...timestamps,
  },
  (table) => ({
    idx_transaction_types_name: index("idx_transaction_types_name").on(
      table.name
    ),
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
    name: text("category").primaryKey(), // groceries, rent, etc
    type: text("type")
      .notNull()
      .references(() => transaction_types.name, { onDelete: "cascade" }), // name of the transaction type
    ...timestamps,
  },
  (table) => ({
    idx_transaction_categories_name: index(
      "idx_transaction_categories_name"
    ).on(table.name),
    idx_transaction_categories_type_id: index(
      "idx_transaction_categories_type_name"
    ).on(table.type),
    pgPolicy: pgPolicy("authenticated users can read transaction categories", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`true`,
    }),
  })
);

export const budget_transactions = pgTable(
  "budget_transactions",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: text("category")
      .notNull()
      .references(() => transaction_categories.name, { onDelete: "cascade" }), // salary, bonus, etc
    amount: numeric("amount").notNull(), // amount of the transaction
    currency: text("currency")
      .notNull()
      .references(() => currency.code, { onDelete: "cascade" }), // USD, EUR, etc
    date: timestamp("date", { withTimezone: true }).notNull().defaultNow(), // date of the transaction
    is_archived: boolean("is_archived").default(false), // whether the transaction is archived
    ...timestamps,
  },
  (table) => ({
    idx_income_transactions_user_category_date: index(
      "idx_income_transactions_user_category_date"
    ).on(table.user_id, table.category, table.date),
    checkConstraint: check("amount is positive", sql`amount >= 0`),
    pgPolicy: pgPolicy("authenticated users can manage their own income", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = auth.uid()`,
    }),
  })
);
