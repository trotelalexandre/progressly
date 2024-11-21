import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

interface BudgetsPageContentProps {
  params: {
    month: string;
    year: string;
  };
}

export default async function BudgetsPageContent({
  params,
}: BudgetsPageContentProps) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/sign-in");
  }

  const userId = user.id;

  const activeMonth = new Date().getMonth() + 1;
  const activeYear = new Date().getFullYear();

  redirect(`/app/budgets/${activeMonth}/${activeYear}`);
}
