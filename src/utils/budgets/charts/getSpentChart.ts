import { eachDayOfInterval, format } from "date-fns";
import lodash from "lodash";
import { CategoriesByType, Transactions } from "@/types/budget";
import { getExpenseTransactions } from "../getExpenseTransactions";

/**
 * Returns the chart data and trend for the spent chart.
 *
 * @param transactions The transactions.
 * @param categoriesByType The categories by type.
 * @returns The chart data and trend for the spent chart.
 */
export const getSpentChart = (
  transactions: Transactions,
  categoriesByType: CategoriesByType
) => {
  const expenseTransactions = getExpenseTransactions(
    transactions,
    categoriesByType
  );

  const allDates = eachDayOfInterval({
    start: new Date(
      Math.min(...expenseTransactions.map((t) => new Date(t.date).getTime()))
    ),
    end: new Date(),
  });

  const transactionsPerDay = lodash.groupBy(
    expenseTransactions,
    (transaction) => format(new Date(transaction.date), "yyyy-MM-dd")
  );

  const chartData = allDates.map((date) => {
    const day = format(date, "yyyy-MM-dd");
    const spent = (transactionsPerDay[day] || []).reduce(
      (acc, transaction) => acc + parseFloat(transaction.amount),
      0
    );

    return {
      day,
      spent,
    };
  });

  const yesterday = format(new Date(Date.now() - 86400000), "yyyy-MM-dd");
  const today = format(new Date(), "yyyy-MM-dd");

  const spentToday = chartData.find((data) => data.day === today)?.spent;
  const spentYesterday = chartData.find(
    (data) => data.day === yesterday
  )?.spent;

  const trend =
    spentToday && spentYesterday
      ? (spentToday - spentYesterday) / spentYesterday
      : 0;

  return { chartData, trend };
};
