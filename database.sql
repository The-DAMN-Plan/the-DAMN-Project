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