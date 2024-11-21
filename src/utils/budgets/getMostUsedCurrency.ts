import { Transactions } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the most used currency.
 *
 * @param transactions The transactions.
 * @returns The most used currency.
 */
export const getMostUsedCurrency = (transactions: Transactions) => {
  if (!transactions.some((transaction) => transaction.currency)) {
    return "EUR";
  }

  const currencyCount = lodash.countBy(transactions, "currency");
  const currency =
    lodash.maxBy(
      Object.keys(currencyCount),
      (currency) => currencyCount[currency]
    ) ?? "EUR";

  return currency;
};
