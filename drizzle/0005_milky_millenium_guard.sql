ALTER POLICY "authenticated users can manage their own income" ON "budget_transactions" TO authenticated USING (("budget_transactions"."user_id" = (select auth.uid())));--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own completed days" ON "habit_completed_days" TO authenticated USING ("habit_completed_days"."habit_id" in (select id from habits where user_id = (select auth.uid())));--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own habits" ON "habits" TO authenticated USING (("habits"."user_id" = (select auth.uid())));--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own investment dividends" ON "investment_dividends" TO authenticated USING ("investment_dividends"."portfolio_id" in (select id from portfolio where user_id = (select auth.uid())));--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own investment assets" ON "investment_user_assets" TO authenticated USING ("investment_user_assets"."portfolio_id" in (select id from portfolio where user_id = (select auth.uid())));--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own investments" ON "portfolio" TO authenticated USING (("portfolio"."user_id" = (select auth.uid())));--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own readings" ON "readings" TO authenticated USING (("readings"."user_id" = (select auth.uid())));