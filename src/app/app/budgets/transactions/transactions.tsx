import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default async function Transactions() {
  return (
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
  );
}
