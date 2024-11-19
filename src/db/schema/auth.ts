import { sql } from "drizzle-orm";
import {
  pgTable,
  uuid,
  timestamp,
  pgPolicy,
  serial,
  integer,
  uniqueIndex,
  index,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { timestamps } from "./timestamps";

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
  (table) => ({
    pgPolicy: pgPolicy("authenticated users can manage their own user", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.id} = auth.uid()`,
    }),
  })
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
      using: sql`${table.user_id} = auth.uid()`,
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
      using: sql`${table.user_id} = auth.uid()`,
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
        using: sql`${table.user_id} = auth.uid()`,
      }
    ),
  })
);
