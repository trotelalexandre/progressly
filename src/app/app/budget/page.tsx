import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
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
import DatePickerBudget from "@/components/features/budget/date-picker-budget";

export default async function BudgetPage() {
  return (
    <div className="flex-col gap-8 flex">
      <Tabs className="space-y-4" defaultValue="transactions">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions">
          <div className="grid grid-cols-2 gap-4">
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
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Categories</CardTitle>
                <CardDescription>Spending by category</CardDescription>
              </CardHeader>
              <CardContent>
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="text-left">Category</th>
                      <th className="text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Food</td>
                      <td className="text-right">$500</td>
                    </tr>
                    <tr>
                      <td>Entertainment</td>
                      <td className="text-right">$300</td>
                    </tr>
                    <tr>
                      <td>Transportation</td>
                      <td className="text-right">$200</td>
                    </tr>
                  </tbody>
                </table>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Income vs Expense</CardTitle>
                <CardDescription>Income and expense comparison</CardDescription>
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

                <div className="mt-4">
                  <Progress value={75} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
