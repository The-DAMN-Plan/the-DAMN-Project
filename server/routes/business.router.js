const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET: get businesses for a particular user
 */
router.get('/', (req, res) => {
    console.log('Getting businesses...');
    const queryText = `select *,
    (SELECT coalesce(jsonb_agg(item), '[]'::jsonb) FROM (
        SELECT "budgets".* FROM "budgets" WHERE "budgets"."business_id"="businesses"."id") item) as "budgets"
         from "businesses" where user_id=${req.user.id}`;
    pool.query(queryText).then((result)=>{
        res.send(result.rows);
    }).catch((error)=>{
        console.error(error);
        res.send(500);
    })
});

/**
 * POST: create business
 */
router.post('/', (req, res) => {
    console.log('Creating business...');
    const queryText = `INSERT INTO businesses ("user_id", 
                                                "name", 
                                                "occupation_type", 
                                                "type_of_business", 
                                                "number_of_employees",  
                                                "year_business_started", 
                                                "average_revenue") VALUES ($1,$2,$3,$4,$5,$6,$7)`;
    pool.query(queryText, [ req.user.id,
                            req.body.name, 
                            req.body.occupation_type, 
                            req.body.type_of_business, 
                            req.body.number_of_employees, 
                            req.body.year_business_started, 
                            req.body.average_revenue ])
    .then(()=>{
        res.send(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    })
});

// PUT: update a business
router.put('/:id', (req,res)=>{
    console.log('Updating business');
    const queryText = `update "businesses" set "name"=$1, 
                                                "occupation_type"=$2, 
                                                "type_of_business"=$3, 
                                                "number_of_employees"= $4, 
                                                "year_business_started"=$5, 
                                                "average_revenue"=$6 
                                                where user_id = ${req.user.id} and id=${req.params.id}`;
    pool.query(queryText,[req.body.name,
                        req.body.occupation_type,
                        req.body.type_of_business,
                        req.body.number_of_employees,
                        req.body.year_business_started,
                        req.body.average_revenue])
    .then(()=>{
        res.sendStatus(201);
    }).catch((error)=>{
        console.error(error);
        res.sendStatus(500);
    });
});
module.exports = router;