import {
  mockCategoriesByType,
  mockTransactions,
} from "../../../../__mocks__/budget.mocks";
import { getExpenseTransactions } from "../getExpenseTransactions";

describe("getExpenseTransactions", () => {
  it("should return the expense transactions", () => {
    const result = getExpenseTransactions(
      mockTransactions,
      mockCategoriesByType
    );

    expect(result).toEqual([
      {
        amount: "100",
        category: "Groceries",
        currency: "USD",
        date: new Date("2021-01-01"),
        id: 1,
        is_archived: false,
        note: "Groceries",
      },
      {
        amount: "200",
        category: "Rent",
        currency: "USD",
        date: new Date("2021-01-02"),
        id: 2,
        is_archived: false,
        note: "Rent",
      },
      {
        amount: "200",
        category: "Rent",
        currency: "USD",
        date: new Date("2021-01-01"),
        id: 3,
        is_archived: false,
        note: "Rent",
      },
    ]);
  });

  it("should return empty array if there are no expense transactions", () => {
    const result = getExpenseTransactions([], mockCategoriesByType);

    expect(result).toEqual([]);
  });

  it("should return empty array if there are no categories", () => {
    const result = getExpenseTransactions(mockTransactions, {});

    expect(result).toEqual([]);
  });
});
