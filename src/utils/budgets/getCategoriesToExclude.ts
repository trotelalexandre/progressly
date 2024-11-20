import { CategoriesByType } from "@/types/budget";

export const getCategoriesToExclude = (categoriesByType: CategoriesByType) => {
  const categoriesToExclude = categoriesByType["income"]
    .concat(categoriesByType["investment"])
    .map((category) => category.name);

  return categoriesToExclude;
};
