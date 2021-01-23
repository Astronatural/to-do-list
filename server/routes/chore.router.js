const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET -- show chores table on the DOM
router.get('/', (req, res) => {
    let queryText = 'SELECT * FROM "chores" ORDER BY "id";';
    pool.query(queryText).then(result => {
        // Sends back the results in an object
        res.send(result.rows);
       // res.sendStatus(200);  // hmm...
    })
        .catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
});

// POST --  add a new chore
router.post('/', (req, res) => {
    let newChore = req.body;
    console.log(`Adding chore`, newChore);

    let queryText = `INSERT INTO "chores" ("task", "status")
                   VALUES ($1, $2);`;
    pool.query(queryText, [newChore.task, newChore.status])
        .then(result => {
            res.sendStatus(201);
        })
        .catch(error => {
            console.log(`Error adding new chore`, error);
            res.sendStatus(500);
        });
});

// PUT -- edit a chore, mark as finished.

// DELETE -- Remove a chore from the DB and DOM


module.exports = router;