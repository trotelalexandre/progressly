ALTER TABLE "income_transactions" RENAME TO "budget_transactions";--> statement-breakpoint
ALTER TABLE "budget_transactions" DROP CONSTRAINT "income_transactions_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "budget_transactions" DROP CONSTRAINT "income_transactions_category_transaction_categories_category_fk";
--> statement-breakpoint
ALTER TABLE "budget_transactions" DROP CONSTRAINT "income_transactions_currency_currency_code_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "budget_transactions" ADD CONSTRAINT "budget_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "budget_transactions" ADD CONSTRAINT "budget_transactions_category_transaction_categories_category_fk" FOREIGN KEY ("category") REFERENCES "public"."transaction_categories"("category") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "budget_transactions" ADD CONSTRAINT "budget_transactions_currency_currency_code_fk" FOREIGN KEY ("currency") REFERENCES "public"."currency"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
ALTER POLICY "authenticated users can manage their own income" ON "budget_transactions" TO authenticated USING ("budget_transactions"."user_id" = auth.uid());