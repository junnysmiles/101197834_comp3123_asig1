// Adding express, and file system
const express = require('express')
const app = express();
const router = express.Router()
const fs = require('fs');
const { resourceLimits } = require('worker_threads');


// Created main page for Assignment 1
router.get('/', (req, res) => {
    res.send("<h1>Welcome to Full Stack Developement, Assignment 1!</h1>")
})


// Showing all the details from users.json just for fun
router.get('/users', (req, res) => {
    // Read file of users.json to show data
    fs.readFile(__dirname + "/users.json", "utf-8", (err, data) => {
        if (err) {
            throw err
        } else {
            res.write(data)
            res.end(data)
        }
    })
})


// Having User Id input, and returning certain fields
// http://localhost:8080/user?uid=?
router.get("/user", (req, res) => {
    // Reading the file of users.json
    let file = fs.readFileSync(__dirname + "/users.json")
    
    // Accessing data of the file and parsing data
    let parsed = JSON.parse(file)

    // Setting the URL query
    var userId = req.query.uid

    // For loop to go through each index of the json list
    for (var i = 0; i < parsed.length; i++) {
        
        // Initializing data variable to access data in the list from 1-10
        let data = parsed[i]
        
        // Initializing uid variable and accessing ID in each index of the list to compare from queried ID in url
        let uid = parsed[i].id

        // Setting JSON response for data being accessed by index
        let response = {
            id: uid,
            name: data.name,
            email: data.email,
            address: data.address.street + ", " + data.address.city
                + ", " + data.address.zipcode,
            phone: data.phone
        }

        // If queried url ID matches the ID accessed in the list, send data specific to the ID being accessed
        if (userId == uid) {
            res.send(response)
        }
    }

    // Setting JSON response for users outside of the ID index
    let unknown = {
        Message: "No User Found"
    }
    // Sending the response of unknown if queried ID is outside of ID scope
    res.send(unknown)
})


router.get("/users/all", (req, res) => {
        // Reading the file of users.json
        let file = fs.readFileSync(__dirname + "/users.json")
    
        // Accessing data of the file and parsing data
        let parsed = JSON.parse(file)

        for (var i = 0; i < parsed.length; i++) {
            let usernames = parsed[i].username

            

            let sorted = usernames.sort()
            res.send(sorted)
        }
})


// Setting route
app.use('/', router);


// Setting web server on port 8080
app.listen(process.env.port || 8080)

console.log('Web Server is listening at port '+ (process.env.port || 8080))