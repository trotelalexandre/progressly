import {
  pgTable,
  serial,
  text,
  timestamp,
  integer,
  numeric,
  boolean,
  uniqueIndex,
  index,
  uuid,
  date,
  pgPolicy,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { authenticatedRole } from "drizzle-orm/supabase";

const timestamps = {
  updated_at: timestamp({ withTimezone: true }).defaultNow(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
};

export const users = pgTable(
  "users",
  {
    id: uuid("id")
      .primaryKey()
      .default(sql`gen_random_uuid()`),
    email: text("email").notNull().unique(),
    name: text("name"),
    password_hash: text("password_hash"),
    email_verified: timestamp("email_verified", { withTimezone: true }),
    image: text("image"),
    ...timestamps,
  },
  (table) => [
    pgPolicy("authenticated users can read their own user", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`true`,
    }),
    pgPolicy("authenticated users can insert their own user", {
      as: "permissive",
      to: authenticatedRole,
      for: "insert",
      using: sql`${table.id} = current_user_id()`,
    }),
    pgPolicy("authenticated users can update their own user", {
      as: "permissive",
      to: authenticatedRole,
      for: "update",
      using: sql`${table.id} = current_user_id()`,
    }),
    pgPolicy("authenticated users can delete their own user", {
      as: "permissive",
      to: authenticatedRole,
      for: "delete",
      using: sql`${table.id} = current_user_id()`,
    }),
  ]
);

export const accounts = pgTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    provider_account_id: text("provider_account_id").notNull(),
    refresh_token: text("refresh_token"),
    access_token: text("access_token"),
    expires_at: integer("expires_at"),
    token_type: text("token_type"),
    scope: text("scope"),
    id_token: text("id_token"),
    session_state: text("session_state"),
    ...timestamps,
  },
  (table) => ({
    unique_provider: uniqueIndex("unique_provider").on(
      table.provider,
      table.provider_account_id
    ),
    userIndex: index("idx_accounts_user").on(table.user_id),
    pgPolicy: pgPolicy("authenticated users can read their own accounts", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);

export const sessions = pgTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    session_token: text("session_token").notNull().unique(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
    ...timestamps,
  },
  (table) => ({
    idx_sessions_user: index("idx_sessions_user").on(table.user_id),
    pgPolicy: pgPolicy("authenticated users can read their own sessions", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);

export const verification_tokens = pgTable(
  "verification_tokens",
  {
    id: serial("id").primaryKey(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    ...timestamps,
  },
  (table) => ({
    idx_verification_tokens_unique_identifier: uniqueIndex(
      "idx_verification_tokens_unique_identifier"
    ).on(table.identifier, table.token),
    pgPolicy: pgPolicy(
      "authenticated users can read their own verification tokens",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "select",
        using: sql`true`,
      }
    ),
  })
);

export const authenticators = pgTable(
  "authenticators",
  {
    id: serial("id").primaryKey(),
    credential_id: text("credential_id").notNull().unique(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    provider_account_id: text("provider_account_id").notNull(),
    credential_public_key: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credential_device_type: text("credential_device_type").notNull(),
    credential_backed_up: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
    ...timestamps,
  },
  (table) => ({
    idx_authenticators_unique_credential: uniqueIndex(
      "idx_authenticators_unique_credential"
    ).on(table.user_id, table.credential_id),
    idx_authenticators_user: index("idx_authenticators_user").on(table.user_id),
    pgPolicy: pgPolicy(
      "authenticated users can read their own authenticators",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "select",
        using: sql`${table.user_id} = current_user_id()`,
      }
    ),
  })
);

export const habits = pgTable(
  "habits",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    ...timestamps,
  },
  (table) => ({
    userIndex: index("idx_habits_user").on(table.user_id),
    pgPolicy: pgPolicy("authenticated users can manage their own habits", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);

export const habit_completed_days = pgTable(
  "habit_completed_days",
  {
    id: serial("id").primaryKey(),
    habit_id: integer("habit_id")
      .notNull()
      .references(() => habits.id, { onDelete: "cascade" }),
    completed_day: date("completed_day").notNull(),
    ...timestamps,
  },
  (table) => ({
    habitIndex: index("idx_completed_days_habit").on(table.habit_id),
    dateIndex: index("idx_completed_days_date").on(table.completed_day),
    pgPolicy: pgPolicy(
      "authenticated users can manage their own completed days",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "all",
        using: sql`${table.habit_id} in (select id from habits where user_id = current_user_id())`,
      }
    ),
  })
);

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: text("category").notNull(),
    amount: numeric("amount").notNull(),
    date: timestamp("date", { withTimezone: true }).defaultNow(),
    type: text("type").notNull(),
    investment_id: integer("investment_id").references(() => investments.id, {
      onDelete: "cascade",
    }),
    ...timestamps,
  },
  (table) => ({
    idx_transactions_user_category_date: index(
      "idx_transactions_user_category_date"
    ).on(table.user_id, table.category, table.date),
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
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    income: numeric("income").notNull(),
    expenses: numeric("expenses").notNull(),
    investments: numeric("investments").notNull(),
    savings: numeric("savings").notNull(),
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

export const investments = pgTable(
  "investments",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category").notNull(),
    buy_price: numeric("buy_price").notNull(),
    quantity: integer("quantity").notNull(),
    ...timestamps,
  },
  (table) => ({
    idx_investments_user_category: index("idx_investments_user_category").on(
      table.user_id,
      table.category
    ),
    pgPolicy: pgPolicy("authenticated users can manage their own investments", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);

export const readings = pgTable(
  "readings",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    total_pages: integer("total_pages").notNull(),
    current_page: integer("current_page").notNull(),
    is_completed: boolean("is_completed").default(false),
    ...timestamps,
  },
  (table) => ({
    idx_readings_user_completion: index("idx_readings_user_completion").on(
      table.user_id,
      table.is_completed
    ),
    pgPolicy: pgPolicy("authenticated users can manage their own readings", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);
