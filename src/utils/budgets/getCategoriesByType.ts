import lodash from "lodash";

type Category = {
  type: string;
  name: string;
};

export const getCategoriesByType = (categories: Category[]) => {
  const categoriesByType = lodash.groupBy(categories, "type");
  return categoriesByType;
};
