import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function BudgetsPageContent() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const activeMonth = new Date().getMonth() + 1;
  const activeYear = new Date().getFullYear();

  redirect(`/app/budgets/${activeMonth}/${activeYear}`);
}
