import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { BarChart, BookOpen, DollarSign, TrendingUp } from "lucide-react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/auth";
import Header from "@/components/core/header";

export default async function HomePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  return (
    <>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Habit Streak</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">+2 from last week</p>
            <Progress value={70} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Budget Overview
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$1,234 / $2,000</div>
            <p className="text-xs text-muted-foreground">
              61% of monthly budget used
            </p>
            <Progress value={61} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Investment Growth
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+8.2%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Reading Progress
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3 of 5 books</div>
            <p className="text-xs text-muted-foreground">60% of yearly goal</p>
            <Progress value={60} className="mt-2" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Habits</CardTitle>
            <CardDescription>
              Your habit completion for the past 5 days
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                "Exercise",
                "Meditation",
                "Reading",
                "Coding",
                "Journaling",
              ].map((habit, index) => (
                <div key={habit} className="flex items-center">
                  <div className="w-1/3 font-medium">{habit}</div>
                  <div className="w-2/3 flex">
                    {[...Array(5)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-4 h-4 rounded-full mx-1 ${
                          i < 4 - index ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Budget Breakdown</CardTitle>
            <CardDescription>
              Your spending by category this month
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {[
                { category: "Housing", amount: 800, percentage: 40 },
                { category: "Food", amount: 400, percentage: 20 },
                { category: "Transportation", amount: 200, percentage: 10 },
                { category: "Utilities", amount: 150, percentage: 7.5 },
                { category: "Entertainment", amount: 100, percentage: 5 },
              ].map((item) => (
                <div key={item.category} className="flex items-center">
                  <div className="w-1/3 font-medium">{item.category}</div>
                  <div className="w-2/3">
                    <div className="flex justify-between mb-1 text-xs">
                      <span>${item.amount}</span>
                      <span>{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Reading List</CardTitle>
            <CardDescription>Your current and upcoming books</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Atomic Habits",
                  author: "James Clear",
                  progress: 75,
                },
                { title: "Deep Work", author: "Cal Newport", progress: 30 },
                {
                  title: "The Psychology of Money",
                  author: "Morgan Housel",
                  progress: 0,
                },
              ].map((book) => (
                <div key={book.title} className="space-y-2">
                  <div className="font-medium">{book.title}</div>
                  <div className="text-sm text-muted-foreground">
                    {book.author}
                  </div>
                  <Progress value={book.progress} className="h-2" />
                  <div className="text-xs text-right">
                    {book.progress}% complete
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
