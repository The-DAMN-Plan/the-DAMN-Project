const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

/**
 * POST route to insert data into the "future_plans" table
 */
router.post('/', rejectUnauthenticated, (req, res) => {
    const { budget_id, name, start_date, end_date, savings_needed } = req.body;
    const queryText = `
        INSERT INTO future_plans (budget_id, name, start_date, end_date, savings_needed)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *;
    `;
    pool.query(queryText, [budget_id, name, start_date, end_date, savings_needed])
        .then(result => {
            res.sendStatus(201); // Created
        })
        .catch(error => {
            console.error('Error executing POST query', error);
            res.sendStatus(500); // Internal Server Error
        });
});

/**
 * DELETE route to delete future plans
 */
router.delete(':id', rejectUnauthenticated, (req, res) => {
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
