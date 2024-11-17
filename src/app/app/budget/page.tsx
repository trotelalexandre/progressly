import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import DatePickerBudget from "@/app/app/budget/date-picker-budget";
import SpentChart from "./spent-chart";
import { TrendingUp } from "lucide-react";
import CategoriesChart from "./categories-chart";

export default async function BudgetPage() {
  return (
    <div className="flex-col gap-8 flex">
      <Tabs className="space-y-4" defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Transaction</CardTitle>
                <CardDescription>Record a new transaction</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="grid grid-cols-1 gap-4">
                  <Input type="text" placeholder="Title" className="input" />
                  <Input type="number" placeholder="Amount" className="input" />
                  <DatePickerBudget />
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="food">Food</SelectItem>
                      <SelectItem value="entertainment">
                        Entertainment
                      </SelectItem>
                      <SelectItem value="transportation">
                        Transportation
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="income">Income</SelectItem>
                      <SelectItem value="expense">Expense</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button>Add Transaction</Button>
                </form>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Transactions</CardTitle>
                <CardDescription>Recent transactions</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Date</th>
                      <th className="text-left">Description</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>2022-03-01</td>
                      <td>Amazon</td>
                      <td className="text-right">$100</td>
                    </tr>
                    <tr>
                      <td>2022-03-02</td>
                      <td>Apple</td>
                      <td className="text-right">$200</td>
                    </tr>
                    <tr>
                      <td>2022-03-03</td>
                      <td>Google</td>
                      <td className="text-right">$300</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>
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
