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

//CRUD OPERATIONS 

server.get('/api/users', (req, res) => {
    db.find().then(users => {
        res.status(200).json(users);
    }).catch(err => {
        res.status(err.code).json({ success: false, message: 'The users information could not be retrieved'})
    })
})

server.post('/api/users', (req, res) => {
   const { name, bio } = req.body;
    if( !name && !bio ) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'})
    } else {
        db.add({ name, bio})
        .then(user => {
        res.status(201).json({success: true, user});
    })
    .catch(({ code, message }) => {
        res.status(code).json({ success: false, message})
})

  
    

//listening to the server 
server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
});

