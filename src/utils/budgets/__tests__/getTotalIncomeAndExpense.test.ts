import { getTotalIncomeAndExpense } from "../getTotalIncomeAndExpense";
import { mockExpensesByType } from "../../../../__mocks__/budget.mocks";

describe("getTotalIncomeAndExpense", () => {
  it("should return the total income and expense", () => {
    const result = getTotalIncomeAndExpense(mockExpensesByType);

    expect(result).toEqual({ totalIncome: 400, totalExpense: 600 });
  });

  it("should handle empty expenses by type", () => {
    const result = getTotalIncomeAndExpense({});

    expect(result).toEqual({ totalIncome: 0, totalExpense: 0 });
  });

  it("should handle missing income", () => {
    const result = getTotalIncomeAndExpense({
      essential: 100,
      investment: 200,
      lifestyle: 300,
    });

    expect(result).toEqual({ totalIncome: 0, totalExpense: 600 });
  });

  it("should handle missing expenses", () => {
    const result = getTotalIncomeAndExpense({ income: 400 });

    expect(result).toEqual({ totalIncome: 400, totalExpense: 0 });
  });

  it("should handle negative expenses", () => {
    const result = getTotalIncomeAndExpense({
      income: 400,
      essential: -100,
      lifestyle: -200,
      investment: -300,
    });

    expect(result).toEqual({ totalIncome: 400, totalExpense: -600 });
  });

  it("should handle negative income", () => {
    const result = getTotalIncomeAndExpense({
      income: -400,
      essential: 100,
      lifestyle: 200,
      investment: 300,
    });

    expect(result).toEqual({ totalIncome: -400, totalExpense: 600 });
  });
});
