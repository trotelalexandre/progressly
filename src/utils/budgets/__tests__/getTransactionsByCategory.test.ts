import { getTransactionsByCategory } from "../getTransactionsByCategory";
import { mockTransactions } from "../../../../__mocks__/budget.mocks";

describe("getTransactionsByCategory", () => {
  it("should group transactions by category", () => {
    const transactionsByCategory = getTransactionsByCategory(mockTransactions);
    expect(transactionsByCategory).toEqual({
      Groceries: [
        {
          amount: "100",
          category: "Groceries",
          currency: "USD",
          date: new Date("2021-01-01"),
          id: 1,
          is_archived: false,
          note: "Groceries",
        },
      ],
      Rent: [
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
      Secondary: [
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

  it("should group transactions by category and return an empty object if there are no transactions", () => {
    const transactionsByCategory = getTransactionsByCategory([]);
    expect(transactionsByCategory).toEqual({});
  });
});
