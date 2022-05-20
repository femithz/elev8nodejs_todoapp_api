const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");


const port = 5000;

// Database  url 
const dbUrl = "mongodb+srv://Femithz:elev82022@cluster0.sikxt.mongodb.net/?retryWrites=true&w=majority";

// Connect to the cloud database
const client = new MongoClient(dbUrl);


async function run() {
    try {
      await client.connect();
      const database = client.db('todo');
      const todo = database.collection('todo');
      // Query to store things in the db
      const todoDATA = await todo.insertOne({ 
          title: 'My second task', 
          description: 'I want to be able to create multile things!'
        });
        console.log(todoDATA);
        console.log('Database is connected successfully');
    } finally {
      // Ensures that the client will close when you finish/error
      console.log('Final connect');
      await client.close();
    }
}
run().catch(console.log('Connection have an issue'));

// app.get('/', (req, res) => {
//   res.send('Hello World!');
// })
// Function to create to
app.post('/create', (req, res) => {
    let user = {
       username: req.body.username, 
       password: req.body.password
    }
    console.log('User', user);
})

app.listen(port, () => {
  console.log(`My first nodejs application is running on port ${port}`)
})














// const app = express()
// const port = 3000

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// })