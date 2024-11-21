import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsTab from "../../transactions-tab";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { fetchCategories } from "@/utils/db/budgets/categories";
import { getMostUsedCurrency } from "@/utils/budgets/getMostUsedCurrency";
import StatisticsTab from "../../statistics-tab";
import { getCategoriesByType } from "@/utils/budgets/getCategoriesByType";
import { getTransactionsByCategory } from "@/utils/budgets/getTransactionsByCategory";
import { getExpensesByCategory } from "@/utils/budgets/getExpensesByCategory";
import { getExpensesByType } from "@/utils/budgets/getExpensesByType";
import { getTotalIncomeAndExpense } from "@/utils/budgets/getTotalIncomeAndExpense";
import { getExpensePercentages } from "@/utils/budgets/getExpensePercentages";
import { MonthYearPicker } from "../../month-year-picker";
import { fetchMonthlyTransactions } from "@/utils/db/budgets/monthlyTransactions";

interface BudgetsPageContentProps {
  params: {
    month: string;
    year: string;
  };
}

export default async function BudgetsPageContent({
  params,
}: BudgetsPageContentProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const userId = user.id;

  const activeMonth = isNaN(parseInt(params.month, 10))
    ? new Date().getMonth() + 1
    : parseInt(params.month, 10);
  const activeYear = isNaN(parseInt(params.year, 10))
    ? new Date().getFullYear()
    : parseInt(params.year, 10);

  console.log("activeMonth", activeMonth);

  const categories = await fetchCategories.execute();
  const transactions = await fetchMonthlyTransactions.execute({
    userId,
    activeMonth,
    activeYear,
  });
  const currency = getMostUsedCurrency(transactions);
  const categoriesByType = getCategoriesByType(categories);
  const transactionsByCategory = getTransactionsByCategory(transactions);
  const expensesByCategory = getExpensesByCategory(transactionsByCategory);
  const expensesByType = getExpensesByType(
    categoriesByType,
    expensesByCategory
  );
  const { totalIncome, totalExpense } =
    getTotalIncomeAndExpense(expensesByType);
  const { essentialPercentage, lifestylePercentage, investmentPercentage } =
    getExpensePercentages(expensesByType, totalExpense);

  return (
    <div className="flex-col gap-8 flex">
      <Tabs className="space-y-4" defaultValue="transactions">
        <div className="flex flex-col md:flex-row gap-4 items-start justify-start md:items-center md:justify-between">
          <TabsList>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="statistics">Statistics</TabsTrigger>
          </TabsList>

          <MonthYearPicker />
        </div>

        <TabsContent value="transactions">
          <TransactionsTab
            userId={userId}
            categories={categories}
            activeMonth={activeMonth}
            activeYear={activeYear}
          />
        </TabsContent>

        <TabsContent value="statistics">
          <StatisticsTab
            transactions={transactions}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            currency={currency}
            expensesByType={expensesByType}
            expensesByCategory={expensesByCategory}
            essentialPercentage={essentialPercentage}
            lifestylePercentage={lifestylePercentage}
            investmentPercentage={investmentPercentage}
            categoriesByType={categoriesByType}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
