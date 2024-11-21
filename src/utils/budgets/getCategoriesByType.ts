import { Categories } from "@/types/budget";
import lodash from "lodash";

/**
 * Returns the categories grouped by type.
 *
 * @param categories The categories.
 * @returns The categories grouped by type.
 */
export const getCategoriesByType = (categories: Categories) => {
  const categoriesByType = lodash.groupBy(categories, "type");
  return categoriesByType;
};
