import { getUniqueTransactionsDaysCount } from "../getUniqueTransactionsDaysCount";
import { mockTransactions } from "../../../../__mocks__/budget.mocks";

describe("getUniqueTransactionsDayCount", () => {
  it("should return the unique transactions day count", () => {
    const uniqueTransactionsDayCount =
      getUniqueTransactionsDaysCount(mockTransactions);

    expect(uniqueTransactionsDayCount).toEqual(2);
  });

  it("should return 0 if there are no transactions", () => {
    const uniqueTransactionsDayCount = getUniqueTransactionsDaysCount([]);

    expect(uniqueTransactionsDayCount).toEqual(0);
  });
});
