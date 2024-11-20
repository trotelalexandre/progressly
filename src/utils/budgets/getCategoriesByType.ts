import { Categories } from "@/types/budget";
import lodash from "lodash";

export const getCategoriesByType = (categories: Categories) => {
  const categoriesByType = lodash.groupBy(categories, "type");
  return categoriesByType;
};
