import { TransactionsByCategories } from "@/types/budget";
import { mockTransactionsByCategories } from "../../../../__mocks__/budget.mocks";
import { getExpensesByCategory } from "../getExpensesByCategory";

describe("getExpensesByCategory", () => {
  it("should return the expenses by category", () => {
    const result = getExpensesByCategory(mockTransactionsByCategories);

    expect(result).toEqual({
      Groceries: 100,
      Rent: 400,
      Secondary: 500,
    });
  });

  it("should return the expenses by category when there are no transactions", () => {
    const transactionsByCategories: TransactionsByCategories = {};

    const result = getExpensesByCategory(transactionsByCategories);

    expect(result).toEqual({});
  });

  it("should return the expenses by category when there are no transactions in a category", () => {
    const transactionsByCategories: TransactionsByCategories = {
      Groceries: [],
      Rent: [],
      Secondary: [],
    };

    const result = getExpensesByCategory(transactionsByCategories);

    expect(result).toEqual({
      Groceries: 0,
      Rent: 0,
      Secondary: 0,
    });
  });
});
