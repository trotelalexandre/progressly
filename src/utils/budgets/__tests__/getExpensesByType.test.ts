import {
  mockCategoriesByType,
  mockExpensesByCategory,
} from "../../../../__mocks__/budget.mocks";
import { getExpensesByType } from "../getExpensesByType";

describe("getExpensesByType", () => {
  it("should return the expenses by type", () => {
    const expensesByType = getExpensesByType(
      mockCategoriesByType,
      mockExpensesByCategory
    );

    expect(expensesByType).toEqual({
      essential: 100,
      investment: 400,
      income: 500,
    });
  });

  it("should return empty expenses by type when there are no categories", () => {
    const mockCategoriesByType = {};

    const expensesByType = getExpensesByType(
      mockCategoriesByType,
      mockExpensesByCategory
    );

    expect(expensesByType).toEqual({});
  });

  it("should return empty expenses by type when there are no expenses by category", () => {
    const mockExpensesByCategory = {};

    const expensesByType = getExpensesByType(
      mockCategoriesByType,
      mockExpensesByCategory
    );

    expect(expensesByType).toEqual({
      essential: 0,
      investment: 0,
      income: 0,
    });
  });
});
