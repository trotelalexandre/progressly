import lodash from "lodash";

type Transaction = {
  date: Date;
  category: string;
  id: number;
  amount: string;
  currency: string;
  is_archived: boolean | null;
};

type Category = {
  type: string;
  name: string;
};

type CategoriesByType = lodash.Dictionary<Category[]>;

export const getTransactionsByType = (
  transactions: Transaction[],
  categoriesByType: CategoriesByType
) => {
  const transactionsByType = lodash.mapValues(categoriesByType, (categories) =>
    lodash.flatMap(categories, (category) =>
      transactions.filter(
        (transaction) => transaction.category === category.name
      )
    )
  );

  console.log("transactionsByType", transactionsByType);

  return transactionsByType;
};
