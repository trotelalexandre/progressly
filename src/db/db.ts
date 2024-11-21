import "dotenv/config";

import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as budgetsSchema from "./schema/budgets";
import * as currencySchema from "./schema/currency";
import * as habitsSchema from "./schema/habits";
import * as investmentsSchema from "./schema/investments";
import * as readingsSchema from "./schema/readings";
import * as timestampsSchema from "./schema/timestamps";

const connectionString = process.env.POSTGRES_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
export const client = postgres(connectionString, {
  prepare: false,
});
export const db = drizzle(client, {
  logger: process.env.NODE_ENV === "development",
  schema: {
    ...budgetsSchema,
    ...currencySchema,
    ...habitsSchema,
    ...investmentsSchema,
    ...readingsSchema,
    ...timestampsSchema,
  },
});
