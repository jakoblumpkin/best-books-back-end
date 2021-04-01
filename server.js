'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;
const MONGODB_URI = process.env.MONGODB_URI;

const app = express();
app.use(cors());

app.use(express.json());

app.get('/', function (request, response) {
  response.send('Hello World');
});


mongoose.connect(MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to the database!');
});


const User = require('./Models/User');


app.get('/books', getAllBooks);
app.post('/createbooks', createABook);
app.delete('/books/:id', deleteABook);

function getAllBooks(request, response) {
  const name = request.query.email;
  User.find({email: name}, function (err, items) {
    if (err) return console.error(err);
    response.status(200).send(items[0].books);
  });
}

function createABook(request, response) {
  console.log('hello', request.body.email);
  const userEmail = request.body.email;
  const book = {
    name: request.body.name,
    description: request.body.description,
    status: request.body.status
  };

  User.findOne({ email: userEmail }, (err, entry) => {
    if(err) return console.error(err);
    entry.books.push(book);
    entry.save();
    response.status(200).send(entry.books);
  });
}

function deleteABook(request, response) {
  const userEmail = request.query.email;
  const id = request.params.id;
  console.log('idreg', id);
  User.findOne({ email: userEmail }, (err, entry) => {
    if(err) return console.error(err);
    const newBookArray = entry.books.filter((book, i) => {
      return parseInt(id) !== i;
    });
    entry.books = newBookArray;
    entry.save();
    response.status(200).send('Success!');
    console.log(newBookArray);
  });
}


app.listen(PORT, () => console.log(`listening on ${PORT}`));
