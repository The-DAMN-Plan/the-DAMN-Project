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

  // console.log('fetch budget');
  // console.log('budget id', req.params.id);
  const budget_id = parseInt(req.params.id, 10);

  try {
    const result = await pool.query(sql, [budget_id]);
    // console.log(result.rows);
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
      // res.send(result.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('Error getting budgets', error);
    })
});

// update by id
router.put('/budget/:id', async (req, res) => {
  // put route code here
  const sql = `update "budgets" set "escrow_savings"=$1,"y1_cogs"=$2,"y2_cogs"=$3,"cash_balance"=$4,"vp_percent"=$5,"vp_income"=$6, "valuepay"=$8 where id=$7 returning *;`
  const data = req.body;
  const budget_id = Number(req.params.id);

  try {
    const result = await pool.query(sql, [data.escrow_savings, data.y1_cogs, data.y2_cogs, data.cash_balance, data.vp_percent, data.vp_income, budget_id, data.valuepay]);
    res.send(result);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/createstatus', async (req, res) => {
  // POST route code here
  const stepArray = [
    'startplan',
    'fundamentalexpenses',
    'personalsavings',
    'variableexpenses',
    'futureplans',
    'otherexpenses',
    'valuepay',
    'incomeyear1',
    'incomeyear2',
    'overview',
    'businessexpensepage1',
    'businessexpensepage2',
    'marketingy1',
    'marketingy2',
    'hrpagey1',
    'hrpagey2',
    'otherbusiness',
    'breakeven',
    'cashflow']

  const skippableSteps = [
    'futureplans',
    'otherexpenses',
    'otherbusiness',
    'breakeven'
  ]

  const sql = `insert into "status" ("budget_id","step")
  values($1,$2) returning *;`
  const sql2 = `update "status" set completed = true where step =$1 AND budget_id = $2`
  const budget_id = req.body.budget_id;

  try {
    for (const step of stepArray) {
      await pool.query(sql, [budget_id, step]);
    }
    for (const step of skippableSteps) {
      await pool.query(sql2, [step, budget_id]);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/createcashflow', async (req, res) => {
  const monthArray = [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12
  ];
  const yearArray = [
    1, 2
  ];

  const percentArray = [
    8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 10, 10
  ];

  const sql = `INSERT INTO cashflow_months (budget_id, month, percent, year) VALUES ($1, $2, $3, $4)`;

  const budget_id = req.body.budget_id;

  try {
    for (const year of yearArray) {
      for (let i = 0; i < monthArray.length; i++) {
        const month = monthArray[i];
        const percent = percentArray[i];
        await pool.query(sql, [budget_id, month, percent, year]);
      }
    }
    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.sendStatus(500);
  }
});

router.put('/status', async (req, res) => {
  // POST route code here
  const sql = `update "status" set "completed"=$1 where "budget_id"=$2 AND "step"=$3 returning *;`
  const data = req.body;
  try {
    await pool.query(sql, [data.completed, data.budget_id, data.step]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// CREATES a budget upon clicking Start a Business button on dashboard 
router.post('/', async (req, res) => {
  // POST route code here
  const sql = `insert into "budgets" ("business_id","name","escrow_savings","y1_cogs","y2_cogs","cash_balance","vp_percent","vp_income")
  values($1,$2,$3,$4,$5,$6,$7,$8) returning *;`
  const data = req.body;

  try {
    const result = await pool.query(sql, [data.business_id, data.name, data.escrow_savings, data.y1_cogs, data.y2_cogs, data.cash_balance, data.vp_percent, data.vp_income]);
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// GETS all the expenses assoicated with that budget ID
router.get('/expenses/:budgetId', async (req, res) => {
  const budgetId = req.params.budgetId;
  const sql = `SELECT * FROM "expenses"
  WHERE "budget_id" = $1`

  pool.query(sql, [budgetId])
    .then((result) => {
      res.send(result.rows);
    }).catch((error) => {
      res.sendStatus(500);
      console.log('Error getting expenses', error);
    })
});

// Creates all expenses given to it
router.post('/expense', async (req, res) => {
  // POST route code here
  const sql = `insert into "expenses" ("budget_id","type","expense_name","expense_amount","percent_change",
  "frequency","timing","facilitator","vendor","cost_per_use","assets_needed","service")
  values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12) returning *;`
  const data = req.body;
  console.log(data);
  const results = []; // Array to collect all the results
  let errorOccurred = false;
  for (const expense of data) {
    try {
      console.log('add expense: ',expense);
      const result = await pool.query(sql, [
        expense.budget_id, expense.type, expense.expense_name, expense.expense_amount, expense.percent_change,
        expense.frequency, expense.timing, expense.facilitator, expense.vendor, expense.cost_per_use, expense.assets_needed, expense.service // Fixed typo assests_needed -> assets_needed
      ]);
      results.push(result.rows[0]);
    } catch (error) {
      console.log(error);
      errorOccurred = true;
      break; // Break the loop on error
    }
  }

  if (errorOccurred) {
    res.status(500).send('An error occurred while inserting expenses');
  } else {
    res.send(results); // Send all the results back to the client
  }
});

// Updates all expenses given to it
router.put('/expense', async (req, res) => {
  console.log('updating expense');
  // Put route code here
  // {assets_needed: "Photos"
  // budget_id: 3
  // cost_per_use: 200
  // expense_amount: null
  // expense_name: "Business Card"
  // facilitator: "Owner"
  // frequency: 1
  // id: 43
  // percent_change: null
  // service: null
  // timing: "Annual"
  // type: "business marketing"
  // vendor: "In-House"
  // year_id: null}
  // const sql = `UPDATE "expenses" SET "expense_amount" = $1 WHERE "budget_id" = $2 AND "expense_name" = $3`;
  // `insert into "expenses" ("expense_name","expense_amount","percent_change","year",
  // "frequency","timing","facilitator","vendor","cost_per_use","assets_needed","service")
  const sql = `update "expenses" set "expense_name"=$1,"expense_amount"=$2,"percent_change"=$3,
  "frequency"=$4,"timing"=$5,"facilitator"=$6,"vendor"=$7,"cost_per_use"=$8,"assets_needed"=$9,"service"=$10 
  where "budget_id"=$11 and "id"=$12 returning *`;
  // const sql = `update "expenses" set "expense_name"=$1 
  // where "budget_id"=$12 and "expense_name"=$1`;
  const data = req.body;

  // {
  //   budget_id: '3',
  //   expense_name: 'Business Card',
  //   service_provider: 'Owner',
  //   cost_per_use: '200',
  //   assets_needed: 'pictures',
  //   monthly_usage_count: '1',
  //   vendor: 'In-House',
  //   payment_interval: 'Annual'
  // }
  console.log(data);
  try {
    for (const expense of data) {
      let response = await pool.query(sql, [expense.expense_name, expense.expense_amount, expense.expense_percent_changes, 
        expense.frequency, expense.timing, expense.facilitator, expense.vendor, expense.cost_per_use,
        expense.assets_needed, expense.service, expense.budget_id, expense.id]);
      // await pool.query(sql, [expense.expense_name, expense.expense_amount, expense.expense_percent_changes, 
      //   expense.year, expense.frequency, expense.timing, expense.facilitator, expense.vendor, expense.cost_per_use,
      //   expense.assets_needed, expense.service, expense.budget_id]);
      // console.log(response.rows);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Deletes individual expense
router.delete('/expense/:id', async (req, res) => {
  // delete route code here
  const expense_id = Number(req.params.id);
  const sql = `DELETE FROM expenses WHERE id = $1;`

  try {
    await pool.query(sql, [expense_id]);
    res.send(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Adds all Business Incomes
router.post('/revenuestream', async (req, res) => {
  // POST route code here
  const sql = `INSERT INTO "revenue_streams" ("budget_id", "revenue_stream", "description", "price",
    "unit", "time_used", "ideal_client", "rate_of_love", "purchasers","cost_of_delivery") VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *;`;
  const data = req.body;
  try {
    for (const revenueStream of data) {
      const result = await pool.query(sql, [
        revenueStream.budget_id, revenueStream.revenue_stream, revenueStream.description, revenueStream.price, revenueStream.unit, revenueStream.time_used,
        revenueStream.ideal_client, revenueStream.rate_of_love, revenueStream.purchasers, revenueStream.cost_of_delivery]);
    }
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/revenuestream', async (req,res)=>{
  console.log('updating revenue stream ...');
  const query = `update "revenue_streams" set "revenue_stream"=$1,"description"=$2,"price"=$3,
  "unit"=$4,"time_used"=$5,"ideal_client"=$6,"rate_of_love"=$7,"purchasers"=$8,"cost_of_delivery"=$9
  where "budget_id"=$10 and "id"=$11 returning *`;
  const data = req.body;
  try{
    for (const revenueStream of data) {
      pool.query(query, [revenueStream.revenue_stream, revenueStream.description, revenueStream.price, 
        revenueStream.unit, revenueStream.time_used,
        revenueStream.ideal_client, revenueStream.rate_of_love, revenueStream.purchasers, 
        revenueStream.cost_of_delivery, revenueStream.budget_id, revenueStream.id])

    }
      res.sendStatus(200);
  } catch(error){
    console.error(error);
    res.sendStatus(500);
  }
});

// Deletes a business income by ID
router.delete('/revenuestream/:id', async (req, res) => {
  // delete route code here
  const revenue_id = Number(req.params.id);
  const sql = `DELETE FROM "revenue_streams" WHERE id = $1;`

  try {
    await pool.query(sql, [revenue_id]);
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = router;