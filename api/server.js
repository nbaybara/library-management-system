const express = require('express');
const Users = require('../models/dbHelpers');
const Books = require('../models/dbHelpers');
const usersRouter = require('../Routes/users-router');
const booksRouter = require('../Routes/books-router');
const borrowRouter = require('../Routes/borrow-router');
const returnRouter = require('../Routes/return-router');

const server = express();
server.use(express.json())

server.get("/", (req, res) => {
    res.json({ message: "Hello World, from express" });
});
server.use("/users", usersRouter)
server.use("/books", booksRouter)
server.use(borrowRouter)
server.use(returnRouter)

module.exports = server