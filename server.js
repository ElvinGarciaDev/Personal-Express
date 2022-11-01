const express = require('express') // install and require express
const app = express()              // app is express
const path = require('path');
const MongoClient = require('mongodb').MongoClient // install and require mongodb
const PORT = 8000
require('dotenv').config() // to hide mongodb string and any private data. Also needs install

let dbConnectionStr = process.env.DB_STRING // gets connectionString from .env
let db;
let dbName = 'got-characters' // Database name

// Connect to dataBase
MongoClient.connect(dbConnectionStr) // Connect to cluster
    .then(client => {
        console.log(`connected to ${dbName} database`)
        db = client.db(dbName) // connect to specific collection 
       
    })


// MiddleWare
app.set('view engine', 'ejs')

app.set('views', path.join(__dirname, 'views'));

app.use(express.static('public')) // Lets express serve files in public folder
app.use(express.urlencoded({extended: true})) // Needed for request body
app.use(express.json())                       // Needed for request body  


// Routes

// Homepage GET request
app.get('/', (req, res) => {
    
    // go to the collection and turn the data into an array
    db.collection('character').find().toArray()
        .then(data => {
            // let nameList = data.map(item => item.characterName) // dig into the array and select only the characters name
            res.render('index.ejs', { info: data }) // Send data to ejs to render
        })
        .catch(error => console.error(error))
})

app.get("/form.html", (req, res) => {
    res.sendFile(path.join(__dirname,'views/form.html'))
})

// When the form is submitted, it send a post request. It collects all info from input boxes and adds it to MongoDB
app.post('/api', (req, res) => {
    db.collection('character').insertOne(req.body)
    .then(result => {
        console.log(`${req.body} added to dataBase`)
        res.redirect('/') // Reload the page so it send a new get request which will have an updated list
    })
    .catch(error => console.error(error))


})

// If someone wants to update any entry, they'll have to input the name plus any other field they want to update in the input text, finally hit update btn
app.put('/updateEntry', (req, res) => {
    // Loop through the object that came in and loop through it. Delete any keys that are empty
    Object.keys(req.body).forEach(key => {
        if (req.body[key] === null || req.body[key] === undefined || req.body[key] === '') {
            delete req.body[key]
        }
    })
    db.collection('character').findOneAndUpdate({characterName: req.body.characterName }, { // Find the characeter from the value placed in the input
        $set: req.body // Once founded, just update any matching fileds
    })
    .then(results => {
        console.log(`${req.body.characterName} updated`)
        res.json(`${req.body.characterName} updated`)
    })
    .catch(error => console.error(error))
})

// When someone clicks on the trashCan it sends a delete request to the server
app.delete('/deleteEntry', (req, res) => {
    // Go into the database and delete the document that matches the request sent to us
    db.collection('character').deleteOne({characterName: req.body.characeterName})
    .then(results => {
        console.log(`${req.body.characeterName} deleted`)
        res.json(`${req.body.characeterName} deleted`)
    })
    .catch(error => console.error(error))
})

// Connect to port
app.listen(process.env.PORT || PORT, () => {
    console.log('Server running')
})