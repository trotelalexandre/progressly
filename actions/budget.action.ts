"use server";
import "server-only";

import { z } from "zod";
import {
  AddTranssactionFormSchema,
  EditTranssactionFormSchema,
} from "../schema/budget.schema";
import { db } from "@/db/db";
import { createClient } from "@/lib/supabase/server";
import { budget_transactions } from "@/db/schema/budgets";
import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";

export const addTransaction = async (
  data: z.infer<typeof AddTranssactionFormSchema>
) => {
  const { currency, amount, date, category, note } =
    await AddTranssactionFormSchema.parseAsync(data);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You should be logged in to add transactions !");
  }

  const userId = user.id;

  await db.insert(budget_transactions).values({
    user_id: userId,
    category,
    amount: amount.toString(),
    currency,
    date,
    note,
  });

  revalidatePath("/app/budgets");
};

export const editTransaction = async (
  data: z.infer<typeof EditTranssactionFormSchema>
) => {
  const { id, currency, amount, date, category, note } =
    await EditTranssactionFormSchema.parseAsync(data);

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("You should be logged in to edit transactions !");
  }

  const userId = user.id;

  await db
    .update(budget_transactions)
    .set({
      category,
      amount: amount.toString(),
      currency,
      date,
      note,
    })
    .where(eq(budget_transactions.id, id));

  revalidatePath("/app/budgets");
};

export const deleteTransaction = async (id: number) => {
  await db.delete(budget_transactions).where(eq(budget_transactions.id, id));

  revalidatePath("/app/budgets");
};
