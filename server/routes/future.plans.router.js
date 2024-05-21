const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * POST route to insert data into the "future_plans" table
 */
router.post('/', rejectUnauthenticated, async (req, res) => {
    const sql = `
        INSERT INTO future_plans (budget_id, name, start_date, end_date, savings_needed)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    const data = req.body;
    try {
        const result = await pool.query(sql, [data.budget_id, data.name, data.start_date, data.end_date, data.savings_needed]);
        res.send(result.rows);
      } catch (error) {
        console.log(error);
        res.sendStatus(500);
      }
});

router.put('/', rejectUnauthenticated, async (req,res)=>{
    console.log('future plan edit');
//     budget_id: "4"
// ​​
// end_date: "05/06/2025"
// ​​
// id: 5
// ​​
// name: "Trip"
// ​​
// savings_needed: "12000"
// ​​
// start_date: "05/06/2024"
    const sql = `update "future_plans" set "name"=$1,"start_date"=$2,"end_date"=$3,
    "savings_needed"=$4 where "budget_id"=$5 and "id"=$6 returning *`;

    // update "future_plans" set "name"='Trip to india',"start_date"='2024-06-15',"end_date"='2025-06-15',
    // "savings_needed"='9000' where "budget_id"=43 and "id"=9 returning *
    const data = req.body;
    // console.log(data);
    try {
        for (const plan of data) {
            const result = await pool.query(sql, [plan.name, plan.start_date, plan.end_date, 
                                                plan.savings_needed, plan.budget_id, plan.id]);
            // console.log('Results: ', result.rows);
        }
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.sendStatus(500);
        
    }
})
/**
 * DELETE route to delete future plans
 */
router.delete('/:id', rejectUnauthenticated, (req, res) => {
    const futurePlanId = req.params.id;
    const queryText = `
        DELETE FROM future_plans WHERE id = $1;
    `;
    pool.query(queryText, [futurePlanId])
        .then(result => {
            res.sendStatus(204); // No Content
        })
        .catch(error => {
            console.error('Error executing DELETE query', error);
            res.sendStatus(500); // Internal Server Error
        });
});

module.exports = router;
