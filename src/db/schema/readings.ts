import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  pgPolicy,
  uuid,
  integer,
  index,
  text,
  boolean,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { users } from "./auth";
import { timestamps } from "./timestamps";

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
