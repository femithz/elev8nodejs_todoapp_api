const express = require('express');
const app = express();
const { MongoClient } = require("mongodb");


const port = 5000;

// Database  url 
const dbUrl = "mongodb+srv://Femithz:elev82022@cluster0.sikxt.mongodb.net/?retryWrites=true&w=majority";

// Connect to the cloud database
const client = new MongoClient(dbUrl);

// The Function is use to run the db
async function run() {
    try {
        await client.connect();
        console.log('Database is connected successfully');
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
}
run().catch(console.log('Connection have an issue'));
// Entry route
app.get('/', (req, res) => {
    res.send('Welcome to my test api');
})

// Route/Function to create a todo item and add it to the database
app.post('/addTodoItem', async  (req, res) => {
    await client.connect();
    // Declaration of where to have the database table initialized
    const database = client.db('todo');
    const todo = database.collection('todo');
    // Object of data coming from the frontend application
    let todoData = {
       title: "Hello", 
       description: "Hello description"
    }
    todo.insertOne(todoData);
    return res.json({
        message: "Todo item added successfully"
    })
})

// Route/Function to get the list of todo list
app.get('/todos', async(req, res) => {
    await client.connect();
    // Declaration of where to have the database table initialized
    const database = client.db('todo');
    const todo = database.collection('todo');
    // Object of data coming from the frontend application
    const todoLists = await todo.find({});
    return res.json({
        message: "Todo lists returned successfully",
        data: todoLists
    })
})
// Route/Function to get the details of a todo item
app.get('/:id', async(req, res) => {
    await client.connect();
    // Declaration of where to have the database table initialized
    const database = client.db('todo');
    const todo = database.collection('todo');
    let todoItemId = req.params.id;
    // Object of data coming from the frontend application
    const details = await todo.findOne({_id: todoItemId });
    return res.json({
        message: "Todo item details returned successfully",
        data: details
    })
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