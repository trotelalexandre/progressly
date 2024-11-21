import { timestamp } from "drizzle-orm/pg-core";

export const timestamps = {
  updated_at: timestamp({ withTimezone: true }).defaultNow(),
  created_at: timestamp({ withTimezone: true }).defaultNow().notNull(),
};
