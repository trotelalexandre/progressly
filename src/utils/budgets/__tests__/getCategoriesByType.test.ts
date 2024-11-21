import { Categories } from "@/types/budget";
import { getCategoriesByType } from "../getCategoriesByType";
import { mockCategories } from "../../../../__mocks__/budget.mocks";

describe("getCategoriesByType", () => {
  it("should group categories by type", () => {
    const result = getCategoriesByType(mockCategories);

    expect(result).toEqual({
      essential: [
        { name: "Groceries", type: "essential" },
        { name: "Rent", type: "essential" },
      ],
      income: [
        { name: "Secondary", type: "income" },
        { name: "Primary", type: "income" },
      ],
    });
  });

  it("should return an empty object when there are no categories", () => {
    const mockCategories: Categories = [];

    const result = getCategoriesByType(mockCategories);

    expect(result).toEqual({});
  });
});
