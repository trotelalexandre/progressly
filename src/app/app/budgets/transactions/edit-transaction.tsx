"use client";
import "client-only";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
} from "@/components/ui/select";
import { CalendarIcon, Loader2 } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EditTranssactionFormSchema } from "../../../../../schema/budget.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categories, Transaction } from "@/types/budget";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import React, { useState } from "react";
import { getCategoriesByType } from "@/utils/budgets/getCategoriesByType";
import { toast } from "@/hooks/use-toast";
import { z } from "zod";
import { editTransaction } from "../../../../../actions/budget.action";

interface EditTransactionProps {
  transaction: Transaction;
  open: boolean;
  onOpenChange: React.Dispatch<React.SetStateAction<boolean>>;
  categories: Categories;
}

export default function EditTransaction({
  transaction,
  open,
  onOpenChange,
  categories,
}: EditTransactionProps) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof EditTranssactionFormSchema>>({
    resolver: zodResolver(EditTranssactionFormSchema),
    defaultValues: {
      id: transaction.id,
      amount: Number(transaction.amount),
      category: transaction.category,
      currency: transaction.currency,
      date: new Date(transaction.date),
      note: transaction.note ?? undefined,
    },
  });

  const onSubmit = async (data: z.infer<typeof EditTranssactionFormSchema>) => {
    setLoading(true);

    try {
      await editTransaction(data);
      onOpenChange(false);
      toast({
        title: "Transaction edited!",
        description: "Your transaction has been edited successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "An error occurred while editing the transaction.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const categoriesByType = getCategoriesByType(categories);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Transaction</DialogTitle>
        </DialogHeader>
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
                  <FormItem>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger className="gap-4 w-fit">
                          <SelectValue placeholder="Currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
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
                              ? null
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
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="gap-4 w-fit">
                        <SelectValue placeholder="Choose a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {Object.entries(categoriesByType).map(
                        ([type, categories]) => (
                          <SelectGroup key={type}>
                            <SelectLabel>
                              {type.charAt(0).toUpperCase() + type.slice(1)}
                            </SelectLabel>
                            {categories?.map((category) => (
                              <SelectItem
                                key={category.name}
                                value={category.name}
                              >
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        )
                      )}
                    </SelectContent>
                  </Select>
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
                    <Textarea {...field} placeholder="Note" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Loader2 className="animate-spin" />
              ) : (
                "Edit Transaction"
              )}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
