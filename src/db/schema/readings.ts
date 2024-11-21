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
  check,
} from "drizzle-orm/pg-core";
import {
  authenticatedRole,
  authUsers as users,
  authUid,
} from "drizzle-orm/supabase";
import { timestamps } from "./timestamps";

export const reading_categories = pgTable(
  "reading_categories",
  {
    name: text("name").primaryKey(), // fiction, non-fiction, etc
    ...timestamps,
  },
  (table) => ({
    idx_reading_categories_name: index("idx_reading_categories_name").on(
      table.name
    ),
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
    category: text("category")
      .notNull()
      .references(() => reading_categories.name, { onDelete: "cascade" }), // fiction, non-fiction, etc
    ...timestamps,
  },
  (table) => ({
    idx_readings_user_completion: index("idx_readings_user_completion").on(
      table.user_id,
      table.is_completed
    ),
    checkConstraint: check(
      "values are positive",
      sql`${table.total_pages} > 0 and ${table.current_page} >= 0 and ${table.current_page} <= ${table.total_pages}`
    ),
    pgPolicy: pgPolicy("authenticated users can manage their own readings", {
      as: "permissive",
      to: authenticatedRole,
      for: "all",
      using: sql`${table.user_id} = ${authUid}`,
    }),
  })
);
