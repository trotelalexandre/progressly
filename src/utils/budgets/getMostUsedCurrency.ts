import { Transactions } from "@/types/budget";
import lodash from "lodash";

export const getMostUsedCurrency = (transactions: Transactions) => {
  const currencyCount = lodash.countBy(transactions, "currency");
  const currency = lodash.maxBy(
    Object.keys(currencyCount),
    (currency) => currencyCount[currency]
  );

  return currency ?? "EUR";
};
