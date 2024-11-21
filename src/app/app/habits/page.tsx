import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default async function HabitsPage() {
  return (
    <div className="flex-col gap-8 flex">
      <Tabs className="space-y-4" defaultValue="habits">
        <TabsList>
          <TabsTrigger value="habits">Habits</TabsTrigger>
          <TabsTrigger value="statistics">Statistics</TabsTrigger>
        </TabsList>

        <TabsContent value="habits">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Add Habit</CardTitle>
                <CardDescription>Track a new habit</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="flex items-center gap-4">
                  <Input type="text" placeholder="Habit" className="input" />
                  <Button>Add</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="statistics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Statistics</CardTitle>
                <CardDescription>Track your habit progress</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">Coming soon...</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
