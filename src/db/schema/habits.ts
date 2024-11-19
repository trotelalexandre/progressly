import { sql } from "drizzle-orm";
import {
  pgTable,
  serial,
  uuid,
  index,
  pgPolicy,
  integer,
  timestamp,
  text,
} from "drizzle-orm/pg-core";
import { authenticatedRole } from "drizzle-orm/supabase";
import { users } from "./auth";
import { timestamps } from "./timestamps";

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
