DROP POLICY "authenticated users can manage their own budgets" ON "budgets" CASCADE;--> statement-breakpoint
DROP TABLE "budgets" CASCADE;--> statement-breakpoint
ALTER TABLE "transaction_categories" DROP COLUMN IF EXISTS "emoji";