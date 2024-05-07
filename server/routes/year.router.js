const express = require('express');
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');
const router = express.Router();

// GET year data
router.get('/:id',(req,res)=>{
    console.log('getting year data ...');
    const budgetID = req.params.id;
    const sql= `SELECT * FROM "years"
    WHERE budget_id = ${budgetID}`;
    pool.query(sql).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(405);
    })

})

// POST to make the years (Needs a budget ID)
router.post('/:id', async (req, res) => {
    console.log('posting year data ...');
    const budgetID = req.params.id;
    const sql = `
    INSERT INTO "years" ("budget_id", "name", "cogs", "escrow_savings", "vp_percent", "vp_income", "valuepay")
    VALUES ($1, $2, $3, $4, $5, $6, $7)`;

    pool.query(sql, [budgetID, req.body.name, req.body.cogs, req.body.escrow_savings, req.body.vp_percent, req.body.vp_income, req.body.valuepay])
    .then((result) => {
        res.sendStatus(201);

    }).catch((error) => {
        console.error(error);
        res.sendStatus(405);
    })
});




module.exports = router;