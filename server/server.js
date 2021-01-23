const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('server/public/'));

// ROUTES
const router = require('./routes/chore.router') // server/routes/router.js
app.use('/chores', router)
// app.get('/', (req, res) => {res.send( //whatever.. ); });  
// app.post('/', (req, res) => { {req.send( //whatever.. ); });


// Start listening for requests on a specific port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log('listening on port', PORT);
});