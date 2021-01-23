const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET -- show chores table on the DOM
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "chores" ORDER BY "id";';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
    })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
});

// POST --  add a new chore

// PUT -- edit a chore, mark as finished.

// DELETE -- Remove a chore from the DB and DOM


module.exports = router;