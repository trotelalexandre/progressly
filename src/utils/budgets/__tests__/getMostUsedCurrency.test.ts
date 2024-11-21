import { mockTransactions } from "../../../../__mocks__/budget.mocks";
import { getMostUsedCurrency } from "../getMostUsedCurrency";

describe("getMostUsedCurrency", () => {
  it("should return the most used currency", () => {
    const result = getMostUsedCurrency(mockTransactions);

    expect(result).toEqual("USD");
  });

  it("should return EUR if there are no transactions", () => {
    const result = getMostUsedCurrency([]);

    expect(result).toEqual("EUR");
  });

  it("should return EUR if there are no currencies", () => {
    const result = getMostUsedCurrency([
      {
        amount: "100",
        category: "Groceries",
        currency: "",
        date: new Date("2021-01-01"),
        id: 1,
        is_archived: false,
        note: "Groceries",
      },
    ]);

    expect(result).toEqual("EUR");
  });

  it("should handle case when there are multiple currencies with the same count", () => {
    const result = getMostUsedCurrency([
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
        currency: "EUR",
        date: new Date("2021-01-01"),
        id: 2,
        is_archived: false,
        note: "Rent",
      },
      {
        amount: "200",
        category: "Rent",
        currency: "EUR",
        date: new Date("2021-01-01"),
        id: 3,
        is_archived: false,
        note: "Rent",
      },
    ]);

    expect(result).toEqual("EUR");
  });
});
