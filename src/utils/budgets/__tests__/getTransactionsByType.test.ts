import { getTransactionsByType } from "../getTransactionsByType";
import {
  mockTransactions,
  mockCategoriesByType,
} from "../../../../__mocks__/budget.mocks";

describe("getTransactionsByType", () => {
  it("should return the transactions by type", () => {
    const transactionsByType = getTransactionsByType(
      mockTransactions,
      mockCategoriesByType
    );

    expect(transactionsByType).toEqual({
      essential: [
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
      ],
      investment: [],
      income: [
        {
          amount: "500",
          category: "Secondary",
          currency: "USD",
          date: new Date("2021-01-01"),
          id: 4,
          is_archived: false,
          note: "Secondary",
        },
      ],
    });
  });

  it("should return an empty object if there are no transactions", () => {
    const transactionsByType = getTransactionsByType([], mockCategoriesByType);

    expect(transactionsByType).toEqual({
      essential: [],
      investment: [],
      income: [],
    });
  });

  it("should return an empty object if there are no categories by type", () => {
    const transactionsByType = getTransactionsByType(mockTransactions, {});

    expect(transactionsByType).toEqual({});
  });
});
