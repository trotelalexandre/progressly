import { db } from "@/db/db";

export const fetchCategories = db.query.transaction_categories
  .findMany({
    columns: { name: true, type: true },
  })
  .prepare("fetch_categories");
