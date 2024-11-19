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
    email: text("email").notNull().unique(), // email address
    name: text("name"), // full name
    password_hash: text("password_hash"), // hashed password
    email_verified: timestamp("email_verified", { withTimezone: true }), // date when the email was verified
    image: text("image"), // profile picture URL
    ...timestamps,
  },
  (table) => [
    pgPolicy("authenticated users can manage their own user", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
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
    name: text("name").notNull(), // name of the habit
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
    completed_day: timestamp("completed_day", { withTimezone: true }).notNull(), // date when the habit was completed
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

export const currency = pgTable(
  "currency",
  {
    id: serial("id").primaryKey(),
    code: text("code").notNull(), // USD, EUR, etc
    name: text("name").notNull(), // US Dollar, Euro, etc
    symbol: text("symbol").notNull(), // $, €, etc
    ...timestamps,
  },
  (table) => ({
    pgPolicy: pgPolicy("authenticated users can read currency", {
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
    type: text("type").notNull(), // income, expense, investment
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

export const portfolio = pgTable(
  "portfolio",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    currency_id: serial("currency_id")
      .notNull()
      .references(() => currency.id), // USD, EUR, etc
    ...timestamps,
  },
  (table) => ({
    idx_portfolio_user: index("idx_portfolio_user").on(table.user_id),
    pgPolicy: pgPolicy("authenticated users can manage their own investments", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = current_user_id()`,
    }),
  })
);

export const investment_asset_categories = pgTable(
  "investment_asset_categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(), // stocks, bonds, crypto, etc
    ...timestamps,
  },
  (table) => ({
    pgPolicy: pgPolicy(
      "authenticated users can read investment asset categories",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "select",
        using: sql`true`,
      }
    ),
  })
);

export const investment_user_assets = pgTable(
  "investment_user_assets",
  {
    id: serial("id").primaryKey(),
    portfolio_id: serial("portfolio_id").references(() => portfolio.id, {
      onDelete: "cascade",
    }),
    asset: text("asset").notNull(), // bitcoin, tesla, etc
    asset_category_id: serial("asset_category_id").references(
      () => investment_asset_categories.id
    ), // stocks, bonds, crypto, etc
    quantity: numeric("quantity").notNull(), // number of units of the asset
    currency_id: serial("currency_id")
      .notNull()
      .references(() => currency.id), // USD, EUR, etc
    current_value: numeric("current_value").notNull(), // current value of the asset
    ...timestamps,
  },
  (table) => ({
    idx_investment_user_assets_portfolio: index(
      "idx_investment_user_assets_portfolio"
    ).on(table.portfolio_id),
    pgPolicy: pgPolicy(
      "authenticated users can manage their own investment assets",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "all",
        using: sql`${table.portfolio_id} in (select id from portfolio where user_id = current_user_id())`,
      }
    ),
  })
);

export const investment_dividends = pgTable(
  "investment_dividends",
  {
    id: serial("id").primaryKey(),
    portfolio_id: serial("portfolio_id").references(() => portfolio.id, {
      onDelete: "cascade",
    }),
    asset_id: serial("asset_id").references(() => investment_user_assets.id, {
      onDelete: "cascade",
    }), // bitcoin, tesla, etc
    asset_category_id: serial("asset_category_id").references(
      () => investment_asset_categories.id
    ), // stocks, bonds, crypto, etc
    amount: numeric("amount").notNull(), // amount of the dividend
    currency_id: serial("currency_id")
      .notNull()
      .references(() => currency.id), // USD, EUR, etc
    date: timestamp("date", { withTimezone: true }).defaultNow(), // date of the dividend
    notes: text("notes"),
    ...timestamps,
  },
  (table) => ({
    idx_investment_dividends_portfolio_date: index(
      "idx_investment_dividends_portfolio_date"
    ).on(table.portfolio_id, table.date),
    pgPolicy: pgPolicy(
      "authenticated users can manage their own investment dividends",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "all",
        using: sql`${table.portfolio_id} in (select id from portfolio where user_id = current_user_id())`,
      }
    ),
  })
);

export const reading_categories = pgTable(
  "reading_categories",
  {
    id: serial("id").primaryKey(),
    name: text("name").notNull(), // fiction, non-fiction, etc
    ...timestamps,
  },
  (table) => ({
    pgPolicy: pgPolicy("authenticated users can read reading categories", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`true`,
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
    title: text("title").notNull(), // title of the book
    total_pages: integer("total_pages").notNull(), // total number of pages in the book
    current_page: integer("current_page").notNull(), // current page number
    is_completed: boolean("is_completed").default(false), // whether the book is completed
    category_id: serial("category_id")
      .notNull()
      .references(() => reading_categories.id, { onDelete: "cascade" }), // fiction, non-fiction, etc
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
