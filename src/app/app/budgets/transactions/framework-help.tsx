import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

export default async function FrameworkHelp() {
  return (
    <Card className="flex flex-col">
      <CardContent className="flex flex-1">
        <div className="flex flex-col justify-between">
          <div className="py-6 px-0 space-y-1.5">
            <CardTitle className="font-semibold leading-none tracking-tight">
              The 50/30/20 Budget Method
            </CardTitle>
            <CardDescription className="text-sm text-muted-foreground">
              A simple way to budget your money
            </CardDescription>
          </div>
          <div className="flex justify-evenly items-center gap-4">
            <BudgetCategory percentage={50} title="Essentials" />
            <BudgetCategory percentage={30} title="Lifestyle" />
            <BudgetCategory percentage={20} title="Investments" />
          </div>
          <p className="text-sm text-muted-foreground">
            The 50/30/20 budget rule is a simple way to budget your money. It
            suggests you divide your after-tax income into three categories: 50%
            for essential expenses, 30% for lifestyle expenses, and 20% for
            savings and investments.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

interface BudgetCategoryProps {
  percentage: number;
  title: string;
}

function BudgetCategory({ percentage, title }: BudgetCategoryProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-2xl font-bold">{percentage}%</span>
      <span className="text-sm font-medium text-muted-foreground">{title}</span>
    </div>
  );
}
