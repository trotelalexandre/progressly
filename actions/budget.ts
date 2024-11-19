"use server";
import "server-only";

import { z } from "zod";
import { AddTranssactionFormSchema } from "../schema/budget.schema";
import { db } from "@/db/db";
import { createClient } from "@/lib/supabase/server";
import { budget_transactions } from "@/db/schema/budgets";
import { revalidatePath } from "next/cache";

export const addTransaction = async (
  data: z.infer<typeof AddTranssactionFormSchema>
) => {
  const { currency, amount, date, category } =
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
  });

  revalidatePath("/app/budgets");
};
