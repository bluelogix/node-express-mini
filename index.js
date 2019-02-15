// implement your API here

const express = require('express');

const server = express();

const db = require('./data/db.js');

//uses the middleware 
server.use(express.json());

//START OF ROUTES

server.get('/', (req, res) => {
    res.send('This is the mini-express project');
});

//listening to the server 
server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
});

