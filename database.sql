-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!

-- DB Name: the_DAMN_plan

CREATE TABLE "user" (
	"id" serial primary key ,
    "username" VARCHAR (80) UNIQUE NOT NULL,
    "password" VARCHAR (1000) NOT NULL ,
	"rank" int NOT NULL DEFAULT '1',
	"phone" varchar(60) NOT NULL,
	"first_name" varchar(255) NOT NULL,
	"last_name" varchar(255) NOT NULL,
	"email" varchar(255) NOT NULL,
	"agree_to_emails" boolean NOT NULL DEFAULT false
    );
    
    CREATE TABLE "businesses" (
	"id" serial primary key,
	"user_id" int references "user"(id),
	"name" varchar(255) NOT NULL,
	"occupation_type" varchar(255) NOT NULL,
	"type_of_business" varchar(255) NOT NULL,
	"number_of_employees" int NOT NULL,
	"year_business_started" int NOT NULL,
	"average_revenue" int NOT NULL
);

CREATE TABLE "budgets" (
	"id" serial primary key,
	"business_id" int references businesses(id),
	"name" varchar(255) NOT NULL,
	"created_at" date DEFAULT NOW(),
	"escrow_savings" decimal,
	"y1_cogs" decimal,
	"y2_cogs" decimal,
	"cash_balance" int 
);

CREATE TABLE "status" (
	"id" serial primary key,
	"budget_id" int references budgets(id),
	"step" varchar not null,
    "completed" boolean not null default false
);

CREATE TYPE expense_type AS ENUM ('personal other', 'personal committed', 'personal decision', 'business marketing', 'business hr', 'business other', 'business expense');

CREATE TABLE "expenses" (
	"id" serial primary key ,
	"budget_id" int references budgets(id),
	"type" expense_type NOT NULL,
	"expense_name" varchar(255) NOT NULL,
	"expense_amount" decimal,
	"percent_change" decimal,
	"year" int,
	"frequency" decimal,
	"timing" varchar(255),
	"facilitator" varchar(255),
	"vendor" varchar(255),
	"cost_per_use" decimal,
	"assets_needed" varchar(255),
	"service" varchar(255)
);

CREATE TABLE "future_plans" (
	"id" serial primary key,
	"budget_id" int references budgets(id),
	"name" varchar(255) NOT NULL,
	"start_date" date NOT NULL,
	"end_date" date NOT NULL,
	"savings_needed" decimal NOT NULL 
);

CREATE TABLE "revenue_streams" (
	"id" serial primary key,
	"budget_id" int references budgets(id),
	"revenue_stream" varchar(255) NOT NULL,
	"description" varchar(255),
	"price" decimal NOT NULL,
	"unit" varchar(255),
	"time_used" decimal NOT NULL,
	"ideal_client" varchar(255),
	"rate_of_love" int,
	"purchasers" int NOT NULL,
	"year" date NOT NULL
);

CREATE TABLE "cashflow_months" (
	"id" serial primary key,
	"budget_id" int references budgets(id),
	"month" int,
	"percent" decimal,
	"year" int
);


--** Fake Data **--
-- Insert into "user"
INSERT INTO "user" ("username", "password", "rank", "phone", "first_name", "last_name", "email", "agree_to_emails") VALUES
('johndoe', 'hashed_password', 1, 1234567890, 'John', 'Doe', 'john.doe@example.com', true),
('janedoe', 'hashed_password', 1, 0987654321, 'Jane', 'Doe', 'jane.doe@example.com', false);

-- Insert into "businesses"
INSERT INTO "businesses" ("user_id", "name", "occupation_type", "type_of_business", "number_of_employees", "year_business_started", "average_revenue") VALUES
(1, 'Doe Crafts', 'Arts & Crafts', 'Sole Proprietorship', 5, 2018, 75000),
(2, 'Doe Tech Solutions', 'Information Technology', 'LLC', 10, 2015, 200000);

-- Insert into "budgets"
INSERT INTO "budgets" ("business_id", "name", "escrow_savings", "y1_cogs", "y2_cogs", "cash_balance") VALUES
(1, 'Annual Budget 2023', 5000.00, 15000.00, 17000.00, 30000),
(2, 'Annual Budget 2023', 12000.00, 45000.00, 47000.00, 80000);

-- Insert into "status"
INSERT INTO "status" ("budget_id", "step", "completed") VALUES
(1, 'Initial Planning', true),
(2, 'Initial Planning', true);

-- Insert into "expenses"
INSERT INTO "expenses" ("budget_id", "type", "expense_name", "expense_amount", "percent_change", "year", "frequency", "timing", "facilitator", "vendor", "cost_per_use", "assets_needed", "service") VALUES
(1, 'business other', 'Office Supplies', 2000.00, 5.00, 2023, 1, 'Quarterly', 'OfficeMax', 'Staples', 200.00, 'Printer, Desk', 'Delivery'),
(2, 'business hr', 'Employee Salaries', 30000.00, 4.00, 2023, 1, 'Monthly', 'HR Dept', 'N/A', NULL, NULL, 'Payroll Service');

-- Insert into "future_plans"
INSERT INTO "future_plans" ("budget_id", "name", "start_date", "end_date", "savings_needed") VALUES
(1, 'Expansion Plan 2024', '2024-01-01', '2024-12-31', 10000.00),
(2, 'New Product Launch', '2024-06-01', '2024-12-31', 20000.00);

-- Insert into "revenue_streams"
INSERT INTO "revenue_streams" ("budget_id", "revenue_stream", "description", "price", "unit", "time_used", "ideal_client", "rate_of_love", "purchasers", "year") VALUES
(1, 'Custom Art Pieces', 'Handmade art pieces tailored to client specifications', 150.00, 'piece', 20, 'Art enthusiasts', 8, 50, '2023-01-01'),
(2, 'IT Consultancy', 'Technical support and consulting services for businesses', 200.00, 'hour', 40, 'Small to medium-sized businesses', 9, 75, '2023-01-01');

-- Insert into "cashflow_months"
INSERT INTO "cashflow_months" ("budget_id", "month", "percent", "year") VALUES
(1, 1, 8.00, 2023),
(1, 2, 7.50, 2023),
(2, 1, 10.00, 2023),
(2, 2, 9.50, 2023);


-- ALTER TABLE Statements to Manage Deletions of Budgets and Their Associated Data, as well as Deletions of Businesses and All Budgets Linked to Them

ALTER TABLE "status" 
DROP CONSTRAINT IF EXISTS status_budget_id_fkey, 
ADD CONSTRAINT status_budget_id_fkey FOREIGN KEY ("budget_id") 
REFERENCES budgets(id) ON DELETE CASCADE;

ALTER TABLE "expenses" 
DROP CONSTRAINT IF EXISTS expenses_budget_id_fkey, 
ADD CONSTRAINT expenses_budget_id_fkey FOREIGN KEY ("budget_id") 
REFERENCES budgets(id) ON DELETE CASCADE;

ALTER TABLE "future_plans" 
DROP CONSTRAINT IF EXISTS future_plans_budget_id_fkey, 
ADD CONSTRAINT future_plans_budget_id_fkey FOREIGN KEY ("budget_id") 
REFERENCES budgets(id) ON DELETE CASCADE;

ALTER TABLE "revenue_streams" 
DROP CONSTRAINT IF EXISTS revenue_streams_budget_id_fkey, 
ADD CONSTRAINT revenue_streams_budget_id_fkey FOREIGN KEY ("budget_id") 
REFERENCES budgets(id) ON DELETE CASCADE;

ALTER TABLE "cashflow_months" 
DROP CONSTRAINT IF EXISTS cashflow_months_budget_id_fkey, 
ADD CONSTRAINT cashflow_months_budget_id_fkey FOREIGN KEY ("budget_id") 
REFERENCES budgets(id) ON DELETE CASCADE;

-- Removes all budgets associated with the specified business ID.
ALTER TABLE "budgets" 
DROP CONSTRAINT IF EXISTS budgets_business_id_fkey, 
ADD CONSTRAINT budgets_business_id_fkey FOREIGN KEY ("business_id") 
REFERENCES businesses(id) ON DELETE CASCADE;

-- Adds in the value pay stats so we can save them and pull them later
ALTER TABLE "public"."budgets"
  ADD COLUMN "vp_percent" numeric,
  ADD COLUMN "vp_income" numeric;

-- Adds columns as the correct info so that you can use the income page
ALTER TABLE revenue_streams
  ADD COLUMN "cost_of_delivery" numeric;

ALTER TABLE "public"."revenue_streams"
  DROP COLUMN "year",
  ADD COLUMN "year" integer;
  
ALTER TABLE "public"."budgets" ADD COLUMN "valuepay" numeric;

-- Adds the year_id to the tables
ALTER TABLE “future_plans”
ADD COLUMN “year_id” int references “years”(id);
ALTER TABLE “expenses”
ADD COLUMN “year_id” int references “years”(id);
ALTER TABLE “revenue_streams”
ADD COLUMN “year_id” int references “years”(id);
-- Drops the old “year” columns
ALTER TABLE “revenue_streams”
DROP COLUMN “year”;
ALTER TABLE “expenses”
DROP COLUMN “year”;