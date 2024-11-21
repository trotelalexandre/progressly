CREATE TABLE IF NOT EXISTS "income_transactions" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"category" text NOT NULL,
	"amount" numeric NOT NULL,
	"currency" text NOT NULL,
	"date" timestamp with time zone DEFAULT now(),
	"is_archived" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "amount is positive" CHECK (amount >= 0)
);
--> statement-breakpoint
ALTER TABLE "income_transactions" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "budgets" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"month" integer NOT NULL,
	"year" integer NOT NULL,
	"income" numeric NOT NULL,
	"expenses" numeric NOT NULL,
	"investments" numeric NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "values are positive and month is between 1 and 12" CHECK (income >= 0 and expenses >= 0 and investments >= 0 and month >= 1 and month <= 12 and year >= 0)
);
--> statement-breakpoint
ALTER TABLE "budgets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_categories" (
	"category" text PRIMARY KEY NOT NULL,
	"type" text NOT NULL,
	"emoji" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction_categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "transaction_types" (
	"type" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "transaction_types" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "currency" (
	"code" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"symbol" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "currency" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habit_completed_days" (
	"id" serial PRIMARY KEY NOT NULL,
	"habit_id" integer NOT NULL,
	"completed_day" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "habit_completed_days" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habit_frequencies" (
	"name" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "habit_frequencies" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "habits" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"name" text NOT NULL,
	"frequency" text NOT NULL,
	"is_archived" boolean DEFAULT false,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "habits" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment_asset_categories" (
	"name" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "investment_asset_categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment_dividends" (
	"id" serial PRIMARY KEY NOT NULL,
	"portfolio_id" serial NOT NULL,
	"ticker" text,
	"amount" numeric NOT NULL,
	"currency" text NOT NULL,
	"date" timestamp with time zone DEFAULT now(),
	"notes" text,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "amount is positive" CHECK (amount >= 0)
);
--> statement-breakpoint
ALTER TABLE "investment_dividends" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "investment_user_assets" (
	"ticker" text PRIMARY KEY NOT NULL,
	"portfolio_id" serial NOT NULL,
	"asset_category" text,
	"quantity" numeric NOT NULL,
	"currency" text NOT NULL,
	"current_value" numeric NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "values are positive" CHECK ("investment_user_assets"."quantity" >= 0 and "investment_user_assets"."current_value" >= 0)
);
--> statement-breakpoint
ALTER TABLE "investment_user_assets" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "portfolio" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"currency" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "portfolio" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "reading_categories" (
	"name" text PRIMARY KEY NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "reading_categories" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "readings" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_id" uuid NOT NULL,
	"title" text NOT NULL,
	"total_pages" integer NOT NULL,
	"current_page" integer NOT NULL,
	"is_completed" boolean DEFAULT false,
	"category" text NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now(),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	CONSTRAINT "values are positive" CHECK ("readings"."total_pages" > 0 and "readings"."current_page" >= 0 and "readings"."current_page" <= "readings"."total_pages")
);
--> statement-breakpoint
ALTER TABLE "readings" ENABLE ROW LEVEL SECURITY;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "income_transactions" ADD CONSTRAINT "income_transactions_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "income_transactions" ADD CONSTRAINT "income_transactions_category_transaction_categories_category_fk" FOREIGN KEY ("category") REFERENCES "public"."transaction_categories"("category") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "income_transactions" ADD CONSTRAINT "income_transactions_currency_currency_code_fk" FOREIGN KEY ("currency") REFERENCES "public"."currency"("code") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "budgets" ADD CONSTRAINT "budgets_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "transaction_categories" ADD CONSTRAINT "transaction_categories_type_transaction_types_type_fk" FOREIGN KEY ("type") REFERENCES "public"."transaction_types"("type") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habit_completed_days" ADD CONSTRAINT "habit_completed_days_habit_id_habits_id_fk" FOREIGN KEY ("habit_id") REFERENCES "public"."habits"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habits" ADD CONSTRAINT "habits_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "habits" ADD CONSTRAINT "habits_frequency_habit_frequencies_name_fk" FOREIGN KEY ("frequency") REFERENCES "public"."habit_frequencies"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_dividends" ADD CONSTRAINT "investment_dividends_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_dividends" ADD CONSTRAINT "investment_dividends_ticker_investment_user_assets_ticker_fk" FOREIGN KEY ("ticker") REFERENCES "public"."investment_user_assets"("ticker") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_dividends" ADD CONSTRAINT "investment_dividends_currency_currency_code_fk" FOREIGN KEY ("currency") REFERENCES "public"."currency"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_user_assets" ADD CONSTRAINT "investment_user_assets_portfolio_id_portfolio_id_fk" FOREIGN KEY ("portfolio_id") REFERENCES "public"."portfolio"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_user_assets" ADD CONSTRAINT "investment_user_assets_asset_category_investment_asset_categories_name_fk" FOREIGN KEY ("asset_category") REFERENCES "public"."investment_asset_categories"("name") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "investment_user_assets" ADD CONSTRAINT "investment_user_assets_currency_currency_code_fk" FOREIGN KEY ("currency") REFERENCES "public"."currency"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "portfolio" ADD CONSTRAINT "portfolio_currency_currency_code_fk" FOREIGN KEY ("currency") REFERENCES "public"."currency"("code") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "readings" ADD CONSTRAINT "readings_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "readings" ADD CONSTRAINT "readings_category_reading_categories_name_fk" FOREIGN KEY ("category") REFERENCES "public"."reading_categories"("name") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_income_transactions_user_category_date" ON "income_transactions" USING btree ("user_id","category","date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_budgets_user_year_month" ON "budgets" USING btree ("user_id","year","month");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_transaction_categories_name" ON "transaction_categories" USING btree ("category");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_transaction_categories_type_name" ON "transaction_categories" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_transaction_types_name" ON "transaction_types" USING btree ("type");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_currency_code" ON "currency" USING btree ("code");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_completed_days_habit" ON "habit_completed_days" USING btree ("habit_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_completed_days_date" ON "habit_completed_days" USING btree ("completed_day");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_habits_user" ON "habits" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_investment_dividends_portfolio_date" ON "investment_dividends" USING btree ("portfolio_id","date");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_investment_user_assets_portfolio" ON "investment_user_assets" USING btree ("portfolio_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_portfolio_user" ON "portfolio" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_reading_categories_name" ON "reading_categories" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "idx_readings_user_completion" ON "readings" USING btree ("user_id","is_completed");--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own income" ON "income_transactions" AS PERMISSIVE FOR ALL TO "authenticated" USING ("income_transactions"."user_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own budgets" ON "budgets" AS PERMISSIVE FOR ALL TO "authenticated" USING ("budgets"."user_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "authenticated users can read transaction categories" ON "transaction_categories" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated users can read transaction types" ON "transaction_types" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated users can read currency" ON "currency" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own completed days" ON "habit_completed_days" AS PERMISSIVE FOR ALL TO "authenticated" USING ("habit_completed_days"."habit_id" in (select id from habits where user_id = auth.uid()));--> statement-breakpoint
CREATE POLICY "authenticated users can manage habit frequencies" ON "habit_frequencies" AS PERMISSIVE FOR ALL TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own habits" ON "habits" AS PERMISSIVE FOR ALL TO "authenticated" USING ("habits"."user_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "authenticated users can read investment asset categories" ON "investment_asset_categories" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own investment dividends" ON "investment_dividends" AS PERMISSIVE FOR ALL TO "authenticated" USING ("investment_dividends"."portfolio_id" in (select id from portfolio where user_id = auth.uid()));--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own investment assets" ON "investment_user_assets" AS PERMISSIVE FOR ALL TO "authenticated" USING ("investment_user_assets"."portfolio_id" in (select id from portfolio where user_id = auth.uid()));--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own investments" ON "portfolio" AS PERMISSIVE FOR ALL TO "authenticated" USING ("portfolio"."user_id" = auth.uid());--> statement-breakpoint
CREATE POLICY "authenticated users can read reading categories" ON "reading_categories" AS PERMISSIVE FOR SELECT TO "authenticated" USING (true);--> statement-breakpoint
CREATE POLICY "authenticated users can manage their own readings" ON "readings" AS PERMISSIVE FOR ALL TO "authenticated" USING ("readings"."user_id" = auth.uid());