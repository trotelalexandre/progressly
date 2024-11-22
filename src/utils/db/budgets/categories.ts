import { db } from "@/db/db";
import { asc } from "drizzle-orm";
import { transaction_categories } from "@/db/schema/budgets";

export const fetchCategories = db.query.transaction_categories
  .findMany({
    columns: { name: true, type: true },
    orderBy: [asc(transaction_categories.name)],
  })
  .prepare("fetch_categories");
