import { CategoriesByType } from "@/types/budget";

/**
 * Returns the categories without income and investment categories.
 *
 * @param categoriesByType The categories by type.
 * @returns The categories without income and investment categories.
 */
export const getCategoriesToExclude = (categoriesByType: CategoriesByType) => {
  const categoriesToExclude = (categoriesByType["income"] ?? [])
    .concat(categoriesByType["investment"] ?? [])
    .map((category) => category.name);

  return categoriesToExclude;
};
