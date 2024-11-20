import lodash from "lodash";

type Transaction = {
  currency: string;
};

export const getMostUsedCurrency = (transactions: Transaction[]) => {
  const currencyCount = lodash.countBy(transactions, "currency");
  const currency = lodash.maxBy(
    Object.keys(currencyCount),
    (currency) => currencyCount[currency]
  );

  return currency ?? "EUR";
};
