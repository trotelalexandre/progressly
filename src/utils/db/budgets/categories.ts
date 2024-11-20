import { db } from "@/db/db";

export const fetchCategories = async () => {
  const categories = await db.query.transaction_categories.findMany({
    columns: { name: true, type: true },
  });

  return categories;
};
