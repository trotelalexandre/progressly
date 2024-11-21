import { getRemainingBudget } from "../getRemainingBudget";

describe("getRemainingBudget", () => {
  it("should return the remaining budget and progress value", () => {
    const mockTotalIncome: number = 1000;
    const mockExpense: number = 400;
    const mockPercentage: number = 0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 100,
      progressValue: 80,
    });
  });

  it("should return the remaining budget and progress value when the remaining budget is 0", () => {
    const mockTotalIncome: number = 1000;
    const mockExpense: number = 500;
    const mockPercentage: number = 0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 0,
      progressValue: 100,
    });
  });

  it("should return the remaining budget and progress value when the remaining budget is less than 0", () => {
    const mockTotalIncome: number = 1000;
    const mockExpense: number = 600;
    const mockPercentage: number = 0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 0,
      progressValue: 100,
    });
  });

  it("should handle the case when the total income is 0", () => {
    const mockTotalIncome: number = 0;
    const mockExpense: number = 0;
    const mockPercentage: number = 0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 0,
      progressValue: 0,
    });
  });

  it("should handle negative total income", () => {
    const mockTotalIncome: number = -1000;
    const mockExpense: number = 0;
    const mockPercentage: number = 0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 0,
      progressValue: 0,
    });
  });

  it("should handle negative expense", () => {
    const mockTotalIncome: number = 1000;
    const mockExpense: number = -400;
    const mockPercentage: number = 0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 500,
      progressValue: 0,
    });
  });

  it("should handle negative percentage", () => {
    const mockTotalIncome: number = 1000;
    const mockExpense: number = 400;
    const mockPercentage: number = -0.5;

    const result = getRemainingBudget(
      mockTotalIncome,
      mockExpense,
      mockPercentage
    );

    expect(result).toStrictEqual({
      remainingBudget: 0,
      progressValue: 0,
    });
  });
});
