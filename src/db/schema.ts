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
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id")
    .primaryKey()
    .default(sql`gen_random_uuid()`),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  emailVerified: timestamp("email_verified", { withTimezone: true }),
  image: text("image"),
  name: text("name"),
}).enableRLS();

export const accounts = pgTable(
  "accounts",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    type: text("type").notNull(),
    provider: text("provider").notNull(),
    providerAccountId: text("provider_account_id").notNull(),
    refreshToken: text("refresh_token"),
    accessToken: text("access_token"),
    expiresAt: integer("expires_at"),
    tokenType: text("token_type"),
    scope: text("scope"),
    idToken: text("id_token"),
    sessionState: text("session_state"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    uniqueProvider: uniqueIndex("unique_provider").on(
      table.provider,
      table.providerAccountId
    ),
    userIndex: index("accounts_user_index").on(table.userId),
  })
).enableRLS();

export const sessions = pgTable(
  "sessions",
  {
    id: serial("id").primaryKey(),
    sessionToken: text("session_token").notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow(),
  },
  (table) => ({
    userIndex: index("sessions_user_index").on(table.userId),
  })
).enableRLS();

export const verificationTokens = pgTable(
  "verification_tokens",
  {
    id: serial("id").primaryKey(),
    identifier: text("identifier").notNull(),
    token: text("token").notNull(),
    expires: timestamp("expires", { withTimezone: true }).notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueIdentifier: uniqueIndex("verification_tokens_unique_identifier").on(
      table.identifier,
      table.token
    ),
  })
).enableRLS();

export const authenticators = pgTable(
  "authenticators",
  {
    id: serial("id").primaryKey(),
    credentialID: text("credential_id").notNull().unique(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    providerAccountId: text("provider_account_id").notNull(),
    credentialPublicKey: text("credential_public_key").notNull(),
    counter: integer("counter").notNull(),
    credentialDeviceType: text("credential_device_type").notNull(),
    credentialBackedUp: boolean("credential_backed_up").notNull(),
    transports: text("transports"),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    uniqueCredential: uniqueIndex("authenticators_unique_credential").on(
      table.userId,
      table.credentialID
    ),
    userIndex: index("authenticators_user_index").on(table.userId),
  })
).enableRLS();

export const habits = pgTable(
  "habits",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    completedDays: integer("completed_days[]").array(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userIndex: index("habits_user_index").on(table.userId),
    completedDaysIndex: index("habits_completed_days_index").on(
      table.completedDays
    ),
  })
).enableRLS();

export const transactions = pgTable(
  "transactions",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    category: text("category").notNull(),
    amount: numeric("amount").notNull(),
    date: timestamp("date", { withTimezone: true }).defaultNow(),
    type: text("type").notNull(),
    investmentId: integer("investment_id").references(() => investments.id),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userCategoryDateIndex: index("transactions_user_category_date_index").on(
      table.userId,
      table.category,
      table.date
    ),
  })
).enableRLS();

export const budgets = pgTable(
  "budgets",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    month: integer("month").notNull(),
    year: integer("year").notNull(),
    income: numeric("income").notNull(),
    expenses: numeric("expenses").notNull(),
    investments: numeric("investments").notNull(),
    savings: numeric("savings").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userYearMonthIndex: index("budgets_user_year_month_index").on(
      table.userId,
      table.year,
      table.month
    ),
  })
).enableRLS();

export const investments = pgTable(
  "investments",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    name: text("name").notNull(),
    category: text("category").notNull(),
    buyPrice: numeric("buy_price").notNull(),
    quantity: integer("quantity").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userCategoryIndex: index("investments_user_category_index").on(
      table.userId,
      table.category
    ),
  })
).enableRLS();

export const readings = pgTable(
  "readings",
  {
    id: serial("id").primaryKey(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    title: text("title").notNull(),
    totalPages: integer("total_pages").notNull(),
    currentPage: integer("current_page").notNull(),
    isCompleted: boolean("is_completed").default(false),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    userCompletionIndex: index("readings_user_completion_index").on(
      table.userId,
      table.isCompleted
    ),
  })
).enableRLS();
