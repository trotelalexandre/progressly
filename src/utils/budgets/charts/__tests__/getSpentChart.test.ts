import { getSpentChart } from "../getSpentChart";
import { eachDayOfInterval, format } from "date-fns";
import lodash from "lodash";
import { getExpenseTransactions } from "../../getExpenseTransactions";
import { Transactions } from "@/types/budget";
import {
  mockTransactions,
  mockCategoriesByType,
} from "../../../../../__mocks__/budget.mocks";

jest.mock("date-fns", () => ({
  eachDayOfInterval: jest.fn(),
  format: jest.fn(),
}));

jest.mock("lodash", () => ({
  groupBy: jest.fn(),
}));

jest.mock("../../getExpenseTransactions", () => ({
  getExpenseTransactions: jest.fn(),
}));

describe("getSpentChart", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return correct chart data and trend for valid input", () => {
    (eachDayOfInterval as jest.Mock).mockReturnValue([
      new Date("2021-01-01"),
      new Date("2021-01-02"),
    ]);
    (format as jest.Mock).mockImplementation(
      (date) => date.toISOString().split("T")[0]
    );
    (lodash.groupBy as jest.Mock).mockReturnValue({
      "2021-01-01": [mockTransactions[0]],
      "2021-01-02": [mockTransactions[1]],
    });
    (getExpenseTransactions as jest.Mock).mockReturnValue(mockTransactions);

    const { chartData, trend } = getSpentChart(
      mockTransactions,
      mockCategoriesByType
    );

    expect(chartData).toHaveLength(2);
    expect(chartData[0].day).toBe("2021-01-01");
    expect(chartData[0].spent).toBe(100);
    expect(chartData[1].day).toBe("2021-01-02");
    expect(chartData[1].spent).toBe(200);
    expect(trend).toBe(100);
  });

  it("should handle empty transactions input", () => {
    (eachDayOfInterval as jest.Mock).mockReturnValue([]);
    (format as jest.Mock).mockReturnValue("2021-01-01");
    (lodash.groupBy as jest.Mock).mockReturnValue({});
    (getExpenseTransactions as jest.Mock).mockReturnValue([]);

    const { chartData, trend } = getSpentChart([], mockCategoriesByType);

    expect(chartData).toHaveLength(0);
    expect(trend).toBe(0);
  });

  it("should handle no expense transactions in input", () => {
    (eachDayOfInterval as jest.Mock).mockReturnValue([]);
    (format as jest.Mock).mockReturnValue("2021-01-01");
    (lodash.groupBy as jest.Mock).mockReturnValue({});
    (getExpenseTransactions as jest.Mock).mockReturnValue([]);

    const { chartData, trend } = getSpentChart([], mockCategoriesByType);

    expect(chartData).toHaveLength(0);
    expect(trend).toBe(0);
  });

  it("should include days with no transactions in chart data", () => {
    (eachDayOfInterval as jest.Mock).mockReturnValue([
      new Date("2021-01-01"),
      new Date("2021-01-02"),
    ]);
    (format as jest.Mock).mockImplementation(
      (date) => date.toISOString().split("T")[0]
    );
    (lodash.groupBy as jest.Mock).mockReturnValue({
      "2021-01-01": [mockTransactions[0]],
    });
    (getExpenseTransactions as jest.Mock).mockReturnValue(mockTransactions);

    const { chartData, trend } = getSpentChart(
      mockTransactions,
      mockCategoriesByType
    );

    expect(chartData).toHaveLength(2);
    expect(chartData[0].day).toBe("2021-01-01");
    expect(chartData[0].spent).toBe(100);
    expect(chartData[1].day).toBe("2021-01-02");
    expect(chartData[1].spent).toBe(0);
    expect(trend).toBe(0);
  });

  it("should handle zero spending for yesterday when calculating trend", () => {
    (eachDayOfInterval as jest.Mock).mockReturnValue([
      new Date("2021-01-01"),
      new Date("2021-01-02"),
    ]);
    (format as jest.Mock).mockImplementation(
      (date) => date.toISOString().split("T")[0]
    );
    (lodash.groupBy as jest.Mock).mockReturnValue({
      "2021-01-01": [],
      "2021-01-02": [mockTransactions[1]],
    });
    (getExpenseTransactions as jest.Mock).mockReturnValue(mockTransactions);

    const { chartData, trend } = getSpentChart(
      mockTransactions,
      mockCategoriesByType
    );

    expect(chartData).toHaveLength(2);
    expect(chartData[0].day).toBe("2021-01-01");
    expect(chartData[0].spent).toBe(0);
    expect(chartData[1].day).toBe("2021-01-02");
    expect(chartData[1].spent).toBe(200);
    expect(trend).toBe(0);
  });

  it("should handle negative spending values", () => {
    const negativeTransactions: Transactions = [
      {
        date: new Date("2021-01-01"),
        amount: "-100",
        category: "food",
        id: 1,
        currency: "USD",
        note: "food",
        is_archived: false,
      },
    ];
    (eachDayOfInterval as jest.Mock).mockReturnValue([new Date("2021-01-01")]);
    (format as jest.Mock).mockImplementation(
      (date) => date.toISOString().split("T")[0]
    );
    (lodash.groupBy as jest.Mock).mockReturnValue({
      "2021-01-01": negativeTransactions,
    });
    (getExpenseTransactions as jest.Mock).mockReturnValue(negativeTransactions);

    const { chartData, trend } = getSpentChart(
      negativeTransactions,
      mockCategoriesByType
    );

    expect(chartData).toHaveLength(1);
    expect(chartData[0].day).toBe("2021-01-01");
    expect(chartData[0].spent).toBe(-100);
    expect(trend).toBe(0);
  });
});
