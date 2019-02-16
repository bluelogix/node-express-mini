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

//get
server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(err => {
        res.status(err.code).json({ success: false, message: 'The users information could not be retrieved'})
    })
})

// get by id
server.get('/api/users/:id', (req, res) => {
    const {id} = req.params;

    db.findById(id)
    .then(user=> {
        if (user) {
            res.status(201).json({success: true , user });
        } else {
        res.status(404).json({ message: "The user with the specified ID does not exist."})
        }
    })
    .catch(err => {
        res.status(500).json({  error: "The user information could not be retrieved."})
    })
})


// post 
server.post('/api/users', (req, res) => {
   const { name, bio } = req.body;
    if (!name && !bio ) {
        res.status(400).json({errorMessage: 'Please provide name and bio for the user.'});
    } else {
        db.insert({ name, bio })
        .then(user => {
        res.status(201).json(user);
    })
    .catch(err  => {
        res.status(500).json({ 
            error: 'The users information could not be retrieved'
        });
    })
}
});

// delete 
server.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;

    db.
    remove(userId)
    .then(user => {
        if (user) {
            res.status(204).end();
        } else {
            res.status(404).json({ success: false, message: "The user with the specified ID does not exist." });
        }
    })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" })  
    })
})

// Put 
//If the user with the specified id is not found:

// return HTTP status code 404 (Not Found).
// return the following JSON object: { message: "The user with the specified ID does not exist." }.
// If the request body is missing the name or bio property:

// cancel the request.
// respond with HTTP status code 400 (Bad Request).
// return the following JSON response: { errorMessage: "Please provide name and bio for the user." }.
// If there's an error when updating the user:

// cancel the request.
// respond with HTTP status code 500.
// return the following JSON object: { error: "The user information could not be modified." }.
// If the user is found and the new information is valid:

// update the user document in the database using the new information sent in the reques body.
// return HTTP status code 200 (OK).
// return the newly updated user document.

server.put('/api/users/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;

    db.update(id, changes)
    .then(updated => {
        if( !updated) {
            res.status(404).json({ success: false, message: 'The user with the specified ID does not exist.' })
        } else if ( !changes.name || !changes.bio) {
            return res.status(400).json({  success: false, message: 'Please provide name and bio for the user.' })

        } else {
            return res.status(200).json({ success: true, changes })
        }
    })
    .catch(err => {
        res.status(500).json({  success: false, error: 'The user information could not be modified.'})
    })
})
 

    

//listening to the server 
server.listen(4000, () => {
    console.log('\n*** Running on port 4000 ***\n');
});

