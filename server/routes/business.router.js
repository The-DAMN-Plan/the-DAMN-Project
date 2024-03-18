const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET: get businesses for a particular user
 */
router.get('/', (req, res) => {
    console.log('get businesses');
    //todo: update id to req.user.id
    const queryText = 'select * from "businesses" where user_id=1';
    pool.query(queryText).then((result)=>{
        console.log(result.rows);
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
    const queryText = `INSERT INTO businesses ("user_id", 
                                                "name", 
                                                "occupation_type", 
                                                "type_of_business", 
                                                "number_of_employees",  
                                                "year_business_started", 
                                                "average_revenue") VALUES ($1,$2,$3,$4,$5,$6,$7)`;
    //todo: 1 should be replaced by req.user.body
    pool.query(queryText, [ 1,
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

module.exports = router;