import { sql } from "drizzle-orm";
import { pgTable, pgPolicy, text, uuid, index } from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { timestamps } from "./timestamps";

export const currency = pgTable(
  "currency",
  {
    id: uuid("id").primaryKey(),
    code: text("code").notNull(), // USD, EUR, etc
    name: text("name").notNull(), // US Dollar, Euro, etc
    symbol: text("symbol").notNull(), // $, €, etc
    ...timestamps,
  },
  (table) => ({
    idx_currency_code: index("idx_currency_code").on(table.code),
    pgPolicy: pgPolicy("authenticated users can read currency", {
      as: "permissive",
      to: authenticatedRole,
      for: "select",
      using: sql`true`,
    }),
  })
);
