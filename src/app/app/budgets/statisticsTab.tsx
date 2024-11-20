import { Dictionary } from "lodash";
import CategoriesChart from "./statistics/charts/categories-chart";
import SpentChart from "./statistics/charts/spent-chart";
import IncomeVsExpenses from "./statistics/income-vs-expenses";
import MonthOverview from "./statistics/month-overview";
import RemainingBudget from "./statistics/remaining-budget";
import { Categories, Transactions } from "@/types/budget";

interface StatisticsTabProps {
  transactions: Transactions;
  totalIncome: number;
  totalExpense: number;
  currency: string;
  expensesByType: Record<string, number>;
  expensesByCategory: Record<string, number>;
  essentialPercentage: number;
  lifestylePercentage: number;
  investmentPercentage: number;
  categoriesByType: Dictionary<Categories>;
}

export default function StatisticsTab({
  transactions,
  totalIncome,
  totalExpense,
  currency,
  expensesByType,
  expensesByCategory,
  essentialPercentage,
  lifestylePercentage,
  investmentPercentage,
  categoriesByType,
}: StatisticsTabProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <IncomeVsExpenses
          totalIncome={totalIncome}
          totalExpense={totalExpense}
          currency={currency}
        />
        <MonthOverview
          currency={currency}
          expensesByType={expensesByType}
          essentialPercentage={essentialPercentage}
          lifestylePercentage={lifestylePercentage}
          investmentPercentage={investmentPercentage}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <RemainingBudget
          title="Essential"
          totalIncome={totalIncome}
          expense={expensesByType["essential"]}
          currency={currency}
          percentage={0.5}
        />
        <RemainingBudget
          title="Lifestyle"
          totalIncome={totalIncome}
          expense={expensesByType["lifestyle"]}
          currency={currency}
          percentage={0.3}
        />
        <RemainingBudget
          title="Investment"
          totalIncome={totalIncome}
          expense={expensesByType["investment"]}
          currency={currency}
          percentage={0.2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <SpentChart
          transactions={transactions}
          categoriesByType={categoriesByType}
        />
        <CategoriesChart
          expensesByCategory={expensesByCategory}
          categoriesByType={categoriesByType}
        />
      </div>
    </div>
  );
}
