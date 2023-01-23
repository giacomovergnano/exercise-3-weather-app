// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();

/* Middleware*/
const cors = require('cors');
app.use(cors());
const bodyParser = require('body-parser');
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const port = 3000; 
const server = app.listen(port,() => {
  console.log(`Server is running on ${port}`);
})

// GET route  that returns the projectData
app.get('/allData', (request, response)=>{
  console.log("get")
  console.log(projectData);
  response.send(projectData);
});

// POST route that adds incoming data to projectData
app.post('/clientData' ,(request, response)=>{
projectData = request.body
console.log("Post")
console.log(projectData);
response.send(projectData);
});
