import { getCategoriesChart } from "../getCategoriesChart";
import {
  mockCategoriesByType,
  mockExpensesByCategory,
} from "../../../../../__mocks__/budget.mocks";

describe("getCategoriesChart", () => {
  it("should return correct chart data and config for valid input", () => {
    const result = getCategoriesChart(
      mockExpensesByCategory,
      mockCategoriesByType
    );

    expect(result.chartData).toEqual([
      {
        category: "Groceries",
        spent: 100,
        fill: "hsl(var(--chart-1))",
        label: "Groceries",
      },
    ]);
  });

  it("should sort categories by expenses in descending order", () => {
    const expensesByCategory = {
      Groceries: 100,
      Rent: 200,
      Secondary: 500,
    };

    const result = getCategoriesChart(expensesByCategory, mockCategoriesByType);

    expect(result.chartData).toEqual([
      {
        category: "Rent",
        spent: 200,
        fill: "hsl(var(--chart-1))",
        label: "Rent",
      },
      {
        category: "Groceries",
        spent: 100,
        fill: "hsl(var(--chart-2))",
        label: "Groceries",
      },
    ]);
  });

  it("should limit chart data to top 5 categories", () => {
    const expensesByCategory = {
      Groceries: 100,
      Rent: 200,
      Secondary: 500,
      Savings: 400,
      Utilities: 300,
      Food: 600,
      Transportation: 700,
      Health: 800,
      Entertainment: 900,
      Clothing: 1000,
    };

    const result = getCategoriesChart(expensesByCategory, mockCategoriesByType);

    expect(result.chartData).toHaveLength(5);
  });

  it("should capitalize category labels", () => {
    const result = getCategoriesChart(
      mockExpensesByCategory,
      mockCategoriesByType
    );

    expect(result.chartData[0].label).toEqual("Groceries");
  });

  it("should assign colors dynamically based on index", () => {
    const expensesByCategory = {
      Groceries: 100,
      Rent: 200,
      Secondary: 500,
    };

    const result = getCategoriesChart(expensesByCategory, mockCategoriesByType);

    expect(result.chartData[0].fill).toEqual("hsl(var(--chart-1))");
    expect(result.chartData[1].fill).toEqual("hsl(var(--chart-2))");
  });

  it("should handle empty expensesByCategory input", () => {
    const result = getCategoriesChart({}, mockCategoriesByType);

    expect(result.chartData).toEqual([]);
  });

  it("should handle empty categoriesByType input", () => {
    const result = getCategoriesChart(mockExpensesByCategory, {});

    expect(result.chartData).toEqual([]);
  });

  it("should handle all categories being excluded", () => {
    const expensesByCategory = {
      Secondary: 500,
    };

    const categoriesByType = {
      income: [{ name: "Secondary", type: "income" }],
    };

    const result = getCategoriesChart(expensesByCategory, categoriesByType);

    expect(result.chartData).toEqual([]);
  });

  it("should handle identical expense values across categories", () => {
    const expensesByCategory = {
      Groceries: 100,
      Rent: 100,
    };

    const result = getCategoriesChart(expensesByCategory, mockCategoriesByType);

    expect(result.chartData).toHaveLength(2);
  });
});
