const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();


// gets a budget by budget id
router.get('/:id', async (req, res) => {
  // GET route code here
  const sql = `select *, 
  -- this will get the expenses as a nested object
            (SELECT coalesce(jsonb_agg(item), '[]'::jsonb) FROM (
            SELECT "expenses".* FROM "expenses" WHERE "expenses"."budget_id"="budgets"."id") item) as "expenses",
  -- this will get the status as a nested object
            (SELECT coalesce(jsonb_agg(item), '[]'::jsonb) FROM (
            SELECT "status".* FROM "status" WHERE "status"."budget_id"="budgets"."id") item) as "status",
  -- this will get the future_plans as a nested object
            (SELECT coalesce(jsonb_agg(item), '[]'::jsonb) FROM (
            SELECT "future_plans".* FROM "future_plans" WHERE "future_plans"."budget_id"="budgets"."id") item) as "future_plans",
  -- this will get the revenue_streams as a nested object
            (SELECT coalesce(jsonb_agg(item), '[]'::jsonb) FROM (
            SELECT "revenue_streams".* FROM "revenue_streams" WHERE "revenue_streams"."budget_id"="budgets"."id") item) as "revenue_streams",
  -- this will get the cashflow_months as a nested object
            (SELECT coalesce(jsonb_agg(item), '[]'::jsonb) FROM (
            SELECT "cashflow_months".* FROM "cashflow_months" WHERE "cashflow_months"."budget_id"="budgets"."id") item) as "cashflow_months" from budgets where budgets.id = $1;`
  const budget_id = Number(req.params.id);

  try {
    const result = await pool.query(sql, [budget_id]);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get's all the budgets for a business
router.get('/business/:businessId', async (req, res) => {
  const businessId = req.params.businessId;
  const query = `
  SELECT * FROM "budgets" 
  WHERE "business_id" = $1;
  `;

  pool.query(query, [businessId])
  .then((result) => {
    res.send(result.rows);
  }).catch((error) => {
    res.sendStatus(500);
    console.log('Error getting budgets', error);
  })
});

// update by id
router.put('/:id', async (req, res) => {
  // put route code here
  const sql = `update "budgets" set "name"=$1,"escrow_savings"=$2,"y1_cogs"=$3,"y2_cogs"=$4,"cash_balance"=$5 where id=$6 returning *;`
  const data = req.body;
  const budget_id = Number(req.params.id);

  try {
    const result = await pool.query(sql, [data.name, data.escrow_savings, data.y1_cogs, data.y2_cogs, data.cash_balance, budget_id]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/', async (req, res) => {
  // POST route code here
  const sql = `insert into "budgets" ("business_id","name","escrow_savings","y1_cogs","y2_cogs","cash_balance")
  values($1,$2,$3,$4,$5,$6) returning *;`
  const data = req.body;

  try {
    const result = await pool.query(sql, [data.business_id, data.name, data.escrow_savings, data.y1_cogs, data.y2_cogs, data.cash_balance]);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// creates all expenses given to it
router.post('/expense', async (req, res) => {
  // POST route code here
  const sql = `insert into "expenses" ("budget_id","type","expense_name","expense_amount","percent_change","year",
  "frequency","timing","facilitator","vendor","cost_per_use","assets_needed","service")
  values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning *;`
  const data = req.body;
  console.log(data);
  for (const expense of data) {
    console.log(expense);
    try {
      const result = await pool.query(sql, [
        expense.budget_id, expense.type, expense.expense_name, expense.expense_amount, expense.percent_change, expense.year,
        expense.frequency, expense.timing, expense.facilitator, expense.vendor, expense.cost_per_use, expense.assests_needed, expense.service]);
      // res.send(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

// updates all expenses given to it
router.put('/expense', async (req, res) => {
  // put route code here
  const sql = `update "expenses" set "budget_id"=$1,"type"=$2,"expense_name"=$3,"expense_amount"=$4,"percent_change"=$5,
  "year"=$6,"frequency"=$7,"timing"=$8,"facilitator"=$9,"vendor"=$10,"cost_per_use"=$11,"assets_needed"=$12,"service"=$13 where id=$14 returning *;`
  const data = req.body;
  for (const expense of data) {
    try {
      const result = await pool.query(sql, [
        expense.budget_id, expense.type, expense.expense_name, expense.expense_amount, expense.percent_change, expense.year, expense.frequency,
        expense.timing, expense.facilitator, expense.vendor, expense.cost_per_use, expense.assests_needed, expense.service, expense.id]);
      res.send(result);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  }
});

// deletes individual expense
router.delete('/expense/:id', async (req, res) => {
  // delete route code here
  const expense_id = Number(req.params.id);
  const sql = `delete * from expenses where id = $1;`

  try {
    await pool.query(sql, [expense_id]);
    res.send(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// for delete consider a soft delete using a column on the db. nuking all the tables would be very time consuming.

module.exports = router;