import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface MonthOverviewProps {
  currency: string | undefined;
  expensesByType: { [key: string]: number };
  essentialPercentage: number;
  lifestylePercentage: number;
  investmentPercentage: number;
}

export default function MonthOverview({
  currency = "EUR",
  expensesByType,
  essentialPercentage,
  lifestylePercentage,
  investmentPercentage,
}: MonthOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Month Overview</CardTitle>
        <CardDescription>Monthly spending overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col">
            <span className="text-sm font-medium">Essential</span>
            <span className="text-3xl font-bold">
              {expensesByType["essential"].toFixed(0)} {currency}
            </span>
            <span className="text-sm text-muted-foreground">
              {essentialPercentage}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Lifestyle</span>
            <span className="text-3xl font-bold">
              {expensesByType["lifestyle"].toFixed(0)} {currency}
            </span>
            <span className="text-sm text-muted-foreground">
              {lifestylePercentage}%
            </span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium">Investment</span>
            <span className="text-3xl font-bold">
              {expensesByType["investment"].toFixed(0)} {currency}
            </span>
            <span className="text-sm text-muted-foreground">
              {investmentPercentage}%
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
