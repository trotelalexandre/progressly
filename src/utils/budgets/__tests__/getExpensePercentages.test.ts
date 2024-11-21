import {
  mockExpensesByType,
  mockTotalExpense,
} from "../../../../__mocks__/budget.mocks";
import { getExpensePercentages } from "../getExpensePercentages";

describe("getExpensePercentages", () => {
  it("should return the percentage of the expenses by type", () => {
    const result = getExpensePercentages(mockExpensesByType, mockTotalExpense);

    expect(result).toEqual({
      essentialPercentage: 16,
      lifestylePercentage: 50,
      investmentPercentage: 33,
    });
  });

  it("should return 0 for all percentages if the total expense is 0", () => {
    const result = getExpensePercentages(mockExpensesByType, 0);

    expect(result).toEqual({
      essentialPercentage: 0,
      lifestylePercentage: 0,
      investmentPercentage: 0,
    });
  });

  it("should return 0 if the total expense is negative", () => {
    const result = getExpensePercentages(mockExpensesByType, -100);

    expect(result).toEqual({
      essentialPercentage: 0,
      lifestylePercentage: 0,
      investmentPercentage: 0,
    });
  });

  it("should handle essential expenses being negative", () => {
    const result = getExpensePercentages(
      { ...mockExpensesByType, essential: -100 },
      mockTotalExpense
    );

    expect(result).toEqual({
      essentialPercentage: 0,
      lifestylePercentage: 50,
      investmentPercentage: 33,
    });
  });

  it("should handle lifestyle expenses being negative", () => {
    const result = getExpensePercentages(
      { ...mockExpensesByType, lifestyle: -100 },
      mockTotalExpense
    );

    expect(result).toEqual({
      essentialPercentage: 16,
      lifestylePercentage: 0,
      investmentPercentage: 33,
    });
  });

  it("should handle investment expenses being negative", () => {
    const result = getExpensePercentages(
      { ...mockExpensesByType, investment: -100 },
      mockTotalExpense
    );

    expect(result).toEqual({
      essentialPercentage: 16,
      lifestylePercentage: 50,
      investmentPercentage: 0,
    });
  });
});
