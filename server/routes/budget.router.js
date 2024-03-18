const express = require('express');
const pool = require('../modules/pool');
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

/**
 * POST route template
 */
router.post('/', (req, res) => {
  // POST route code here
});

module.exports = router;
