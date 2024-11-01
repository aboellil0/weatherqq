// Setup empty JS object to act as endpoint for all routes
let projectData = {};
// Require Express to run server and routes
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));
// Spin up the server
const port = 5050;
app.listen(port, callback());
// Callback to debug
// Initialize all route with a callback function
function callback() {
    console.log(`running on localhost: ${port}`);
};
// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData);
});
// Post Route
app.post('/data', (req, res) => {
    projectData = {
        date: req.body.date,
        content: req.body.content,
        temp: req.body.temp,
        entryHolder: req.body.entryHolder
    };
    res.send(projectData);
});