import {
  mockCategories,
  mockCategoriesByType,
} from "../../../../__mocks__/budget.mocks";
import { getCategoriesToExclude } from "../getCategoriesToExclude";

describe("getCategoriesToExclude", () => {
  it("should return the categories without income and investment categories", () => {
    const result = getCategoriesToExclude(mockCategoriesByType);

    expect(result).toEqual(["Secondary", "Primary", "Savings"]);
  });

  it("should return empty array if there are not income and investment categories", () => {
    const mockCategoriesByType = {
      essential: [{ name: "Groceries", type: "essential" }],
    };

    const result = getCategoriesToExclude(mockCategoriesByType);

    expect(result).toEqual([]);
  });

  it("should return empty array if there are no categories", () => {
    const mockCategoriesByType = {};

    const result = getCategoriesToExclude(mockCategoriesByType);

    expect(result).toEqual([]);
  });
});
