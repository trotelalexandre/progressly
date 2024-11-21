import { getBudgetPercentages } from "../getBudgetPercentages";

describe("getBudgetPercentages", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return correct percentages for valid input", () => {
    const mockTotalIncome = 1000;
    const mockTotalExpense = 500;
    const expectedRemainingBudgetPercentage = 50;
    const expectedUsedBudgetPercentage = 50;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });

  it("should handle zero total income", () => {
    const mockTotalIncome = 0;
    const mockTotalExpense = 500;
    const expectedRemainingBudgetPercentage = 0;
    const expectedUsedBudgetPercentage = 100;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });

  it("should handle zero total expense", () => {
    const mockTotalIncome = 1000;
    const mockTotalExpense = 0;
    const expectedRemainingBudgetPercentage = 100;
    const expectedUsedBudgetPercentage = 0;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });

  it("should handle negative total income", () => {
    const mockTotalIncome = -1000;
    const mockTotalExpense = 500;
    const expectedRemainingBudgetPercentage = 0;
    const expectedUsedBudgetPercentage = 100;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });

  it("should handle negative total expense", () => {
    const mockTotalIncome = 1000;
    const mockTotalExpense = -500;
    const expectedRemainingBudgetPercentage = 100;
    const expectedUsedBudgetPercentage = 0;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });

  it("should handle total expense greater than total income", () => {
    const mockTotalIncome = 500;
    const mockTotalExpense = 1000;
    const expectedRemainingBudgetPercentage = 0;
    const expectedUsedBudgetPercentage = 100;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });

  it("should handle total expense equal to total income", () => {
    const mockTotalIncome = 1000;
    const mockTotalExpense = 1000;
    const expectedRemainingBudgetPercentage = 0;
    const expectedUsedBudgetPercentage = 100;

    const result = getBudgetPercentages(mockTotalIncome, mockTotalExpense);

    expect(result.remainingBudgetPercentage).toBe(
      expectedRemainingBudgetPercentage
    );
    expect(result.usedBudgetPercentage).toBe(expectedUsedBudgetPercentage);
  });
});
