import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import SpentChart from "./statistics/spent-chart";
import { TrendingUp } from "lucide-react";
import CategoriesChart from "./statistics/categories-chart";
import AddTransaction from "./transactions/add-transaction";
import Transactions from "./transactions/transactions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { db } from "@/db/db";
import { transaction_categories } from "@/db/schema/budgets";

export default async function BudgetPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/signin");
  }

  const userId = user.id;

  const categories = await db.query.transaction_categories.findMany({
    columns: {
      name: true,
      type: true,
      emoji: true,
    },
  });

  console.log("categories", categories);

  return (
    <div className="flex-col gap-8 flex">
      <Tabs className="space-y-4" defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <AddTransaction userId={userId} />
            <Transactions userId={userId} />
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="flex flex-col gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Income vs Expense</CardTitle>
                  <CardDescription>
                    Income and expense comparison
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Income</div>
                      <div className="text-3xl font-bold">$2,000</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Expense</div>
                      <div className="text-3xl font-bold">$1,500</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={75} />
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Monthly Budget</CardTitle>
                  <CardDescription>Spending progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-sm font-medium">Spent</div>
                      <div className="text-3xl font-bold">$1,500</div>
                    </div>
                    <div>
                      <div className="text-sm font-medium">Remaining</div>
                      <div className="text-3xl font-bold">$500</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={75} />
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Investment</CardTitle>
                  <CardDescription>Investments progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$1,000</div>
                </CardContent>
                <CardFooter>
                  <Progress value={50} />
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Savings</CardTitle>
                  <CardDescription>Savings progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$500</div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} />
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Expenses</CardTitle>
                  <CardDescription>Expenses progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">$1,500</div>
                </CardContent>
                <CardFooter>
                  <Progress value={75} />
                </CardFooter>
              </Card>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card>
                <CardHeader>
                  <CardTitle>Spent</CardTitle>
                  <CardDescription>Spending progress</CardDescription>
                </CardHeader>
                <CardContent>
                  <SpentChart />
                </CardContent>
                <CardFooter className="flex-col items-start gap-2 text-sm">
                  <div className="flex gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Categories</CardTitle>
                  <CardDescription>Spending by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <CategoriesChart />
                </CardContent>
                <CardFooter className="flex-col gap-2 text-sm">
                  <div className="flex items-center gap-2 font-medium leading-none">
                    Trending up by 5.2% this month{" "}
                    <TrendingUp className="h-4 w-4" />
                  </div>
                  <div className="leading-none text-muted-foreground">
                    Showing total visitors for the last 6 months
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
