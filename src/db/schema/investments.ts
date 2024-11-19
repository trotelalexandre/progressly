import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  uuid,
  index,
  pgPolicy,
  numeric,
  timestamp,
  text,
  check,
} from "drizzle-orm/pg-core";
import { authenticatedRole, authUsers as users } from "drizzle-orm/supabase";
import { currency } from "./currency";
import { timestamps } from "./timestamps";

export const portfolio = pgTable(
  "portfolio",
  {
    id: serial("id").primaryKey(),
    user_id: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    currency: text("currency")
      .notNull()
      .references(() => currency.code), // USD, EUR, etc
    ...timestamps,
  },
  (table) => ({
    idx_portfolio_user: index("idx_portfolio_user").on(table.user_id),
    pgPolicy: pgPolicy("authenticated users can manage their own investments", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = auth.uid()`,
    }),
  })
);

export const investment_asset_categories = pgTable(
  "investment_asset_categories",
  {
    name: text("name").primaryKey(), // stocks, bonds, crypto, etc
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
    ticker: text("ticker").primaryKey(), // BTC, APPL, etc
    portfolio_id: serial("portfolio_id").references(() => portfolio.id, {
      onDelete: "cascade",
    }),
    asset_category: text("asset_category").references(
      () => investment_asset_categories.name
    ), // stocks, bonds, crypto, etc
    quantity: numeric("quantity").notNull(), // number of units of the asset
    currency: text("currency")
      .notNull()
      .references(() => currency.code), // USD, EUR, etc
    current_value: numeric("current_value").notNull(), // current value of the asset (in the currency)
    ...timestamps,
  },
  (table) => ({
    idx_investment_user_assets_portfolio: index(
      "idx_investment_user_assets_portfolio"
    ).on(table.portfolio_id),
    checkConstraint: check(
      "values are positive",
      sql`${table.quantity} >= 0 and ${table.current_value} >= 0`
    ),
    pgPolicy: pgPolicy(
      "authenticated users can manage their own investment assets",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "all",
        using: sql`${table.portfolio_id} in (select id from portfolio where user_id = auth.uid())`,
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
    ticker: text("ticker").references(() => investment_user_assets.ticker, {
      onDelete: "cascade",
    }), // BTC, APPL, etc
    amount: numeric("amount").notNull(), // amount of the dividend
    currency: text("currency")
      .notNull()
      .references(() => currency.code), // USD, EUR, etc
    date: timestamp("date", { withTimezone: true }).defaultNow(), // date of the dividend
    notes: text("notes"), // notes about the dividend
    ...timestamps,
  },
  (table) => ({
    idx_investment_dividends_portfolio_date: index(
      "idx_investment_dividends_portfolio_date"
    ).on(table.portfolio_id, table.date),
    checkConstraint: check("amount is positive", sql`amount >= 0`),
    pgPolicy: pgPolicy(
      "authenticated users can manage their own investment dividends",
      {
        as: "permissive",
        to: authenticatedRole,
        for: "all",
        using: sql`${table.portfolio_id} in (select id from portfolio where user_id = auth.uid())`,
      }
    ),
  })
);
