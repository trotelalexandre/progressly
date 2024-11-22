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

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  const today = new Date();

  const allDates = eachDayOfInterval({
    start: oneWeekAgo,
    end: today,
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

  const spentToday = chartData[chartData.length - 1]?.spent;
  const spentYesterday = chartData[chartData.length - 2]?.spent;

  const trend =
    spentToday && spentYesterday
      ? ((spentToday - spentYesterday) / spentYesterday) * 100
      : 0;

  return { chartData, trend };
};
