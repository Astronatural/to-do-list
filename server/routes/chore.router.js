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

// DELETE -- Remove a chore from the DB and DOM
router.delete('/:id', (req, res) => {
    let id = req.params.id; // id of the thing to delete
    const queryText = `DELETE FROM "chores" WHERE id=$1`
    console.log('Delete chore called with id of', id);

    pool.query(queryText, [id])
        .then((result) => {
            res.sendStatus(204); 
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        })
});


// PUT -- edit a chore, mark as finished.
router.put('/:id', (req, res) => {
    let newChore = req.body;

    // let id = req.params.id; // id of the thing to delete
    // let status = req.params.status; // id of the thing to delete
    console.log(req.params.id);
    console.log(req.params.status);
    console.log(req.body);

    const queryText = `UPDATE "chores" SET "status" = $1 WHERE "id" = $2`;
    console.log('Updating chore called with id of', newChore.id, 'and status of', newChore.status );

    pool.query(queryText, [newChore.status, newChore.id])
        .then((result) => {
            res.sendStatus(204);
        })
        .catch((err) => {
            console.log(`Error making query ${queryText}`, err);
            res.sendStatus(500);
        })
});





module.exports = router;