"use client";
import "client-only";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { SelectNative } from "@/components/ui/select-native";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader2 } from "lucide-react";
import { format } from "date-fns";
import { addTransaction } from "../../../../../actions/budget.action";
import { AddTranssactionFormSchema } from "../../../../../schema/budget.schema";
import { useState } from "react";
import { getCategoriesByType } from "@/utils/budgets/getCategoriesByType";
import { Textarea } from "@/components/ui/textarea";

type Categories = {
  name: string;
  type: string;
}[];

export default function AddTransaction({
  categories,
}: {
  categories: Categories;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof AddTranssactionFormSchema>>({
    resolver: zodResolver(AddTranssactionFormSchema),
    defaultValues: {
      amount: undefined,
      currency: "EUR",
      date: new Date(),
      category: "",
      note: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof AddTranssactionFormSchema>) => {
    setLoading(true);

    try {
      await addTransaction(data);
      toast({
        title: "Transaction recorded!",
        description: "Your transaction has been added to your budget.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while adding the transaction.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categoriesByType = getCategoriesByType(categories);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Transaction</CardTitle>
        <CardDescription>Record a new transaction</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-1 gap-4"
          >
            <div className="flex items-center gap-4">
              <FormField
                control={form.control}
                name="currency"
                render={({ field }) => (
                  <FormItem className="w-fit">
                    <SelectNative
                      onChange={field.onChange}
                      value={field.value}
                      className="w-fit"
                    >
                      <option value="EUR">EUR</option>
                      <option value="USD">USD</option>
                    </SelectNative>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Amount"
                        onChange={(e) =>
                          field.onChange(
                            e.target.value === ""
                              ? undefined
                              : Number(e.target.value)
                          )
                        }
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "max-w-[240px] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <SelectNative
                    onChange={field.onChange}
                    value={field.value ?? undefined}
                    placeholder="Choose a category"
                  >
                    {Object.entries(categoriesByType).map(
                      ([type, categories]) => (
                        <optgroup
                          key={type}
                          label={type.charAt(0).toUpperCase() + type.slice(1)}
                        >
                          {categories?.map((category) => (
                            <option key={category.name} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </optgroup>
                      )
                    )}
                  </SelectNative>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Note"
                      value={field.value ?? undefined}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Add Transaction"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
