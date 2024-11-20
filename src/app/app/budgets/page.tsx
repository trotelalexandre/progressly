import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import TransactionsTab from "./transactionsTab";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { fetchCategories } from "@/utils/db/budgets/categories";
import { fetchThisMonthTransactions } from "@/utils/db/budgets/thisMonthTransactions";
import { getMostUsedCurrency } from "@/utils/budgets/getMostUsedCurrency";
import StatisticsTab from "./statisticsTab";
import { getCategoriesByType } from "@/utils/budgets/getCategoriesByType";
import { getTransactionsByCategory } from "@/utils/budgets/getTransactionsByCategory";
import { getExpensesByCategory } from "@/utils/budgets/getExpensesByCategory";
import { getExpensesByType } from "@/utils/budgets/getExpensesByType";
import { getTotalIncomeAndExpense } from "@/utils/budgets/getTotalIncomeAndExpense";
import { getExpensePercentages } from "@/utils/budgets/getExpensePercentages";

export default async function BudgetsPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const userId = user.id;

  const categories = await fetchCategories.execute();
  const transactions = await fetchThisMonthTransactions.execute({ userId });
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
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <TransactionsTab userId={userId} categories={categories} />
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
