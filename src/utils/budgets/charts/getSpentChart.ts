import { eachDayOfInterval, format } from "date-fns";
import lodash from "lodash";

type Transaction = {
  date: Date;
  category: string;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};

export const getSpentChart = (transactions: Transaction[]) => {
  const allDates = eachDayOfInterval({
    start: new Date(
      Math.min(...transactions.map((t) => new Date(t.date).getTime()))
    ),
    end: new Date(
      Math.max(...transactions.map((t) => new Date(t.date).getTime()))
    ),
  });

  const transactionsPerDay = lodash.groupBy(transactions, (transaction) =>
    format(new Date(transaction.date), "yyyy-MM-dd")
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
