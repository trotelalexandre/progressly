import { db } from "@/db/db";
import { budget_transactions } from "@/db/schema/budgets";
import { and, eq, sql, desc } from "drizzle-orm";

const activeMonth = new Date().getMonth() + 1;
const activeYear = new Date().getFullYear();

export const fetchThisMonthTransactions = db.query.budget_transactions
  .findMany({
    columns: {
      id: true,
      category: true,
      amount: true,
      currency: true,
      date: true,
      note: true,
      is_archived: true,
    },
    where: and(
      eq(budget_transactions.user_id, sql.placeholder("userId")),
      eq(budget_transactions.is_archived, false),
      eq(sql`extract(month from ${budget_transactions.date})`, activeMonth),
      eq(sql`extract(year from ${budget_transactions.date})`, activeYear)
    ),
    orderBy: [desc(budget_transactions.date)],
  })
  .prepare("fetch_this_month_transactions");
