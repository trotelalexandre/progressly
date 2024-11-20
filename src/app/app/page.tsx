import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { PiggyBank } from "lucide-react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { fetchThisMonthTransactions } from "@/utils/db/budgets/thisMonthTransactions";
import { getTotalIncomeAndExpense } from "@/utils/budgets/getTotalIncomeAndExpense";
import { getExpensesByType } from "@/utils/budgets/getExpensesByType";
import { fetchCategories } from "@/utils/db/budgets/categories";
import { getCategoriesByType } from "@/utils/budgets/getCategoriesByType";
import { getExpensesByCategory } from "@/utils/budgets/getExpensesByCategory";
import { getTransactionsByCategory } from "@/utils/budgets/getTransactionsByCategory";
import { getRemainingBudgetPercentage } from "@/utils/budgets/getRemainingBudgetPercentage";
import { getMostUsedCurrency } from "@/utils/budgets/getMostUsedCurrency";
import BudgetOverview from "./budget-overview";

export default async function HomePage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const userId = user.id;
  const transactions = await fetchThisMonthTransactions(userId);
  const currency = getMostUsedCurrency(transactions);
  const categories = await fetchCategories();
  const categoriesByType = getCategoriesByType(categories);
  const transactionsByCategory = getTransactionsByCategory(transactions);
  const expensesByCategory = getExpensesByCategory(transactionsByCategory);
  const expensesByType = getExpensesByType(
    categoriesByType,
    expensesByCategory
  );
  const { totalIncome, totalExpense } =
    getTotalIncomeAndExpense(expensesByType);
  const remainingBudgetPercentage = getRemainingBudgetPercentage(
    totalIncome,
    totalExpense
  );

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      <BudgetOverview
        totalIncome={totalIncome}
        totalExpense={totalExpense}
        remainingBudgetPercentage={remainingBudgetPercentage}
        currency={currency}
      />
    </div>
  );
}
