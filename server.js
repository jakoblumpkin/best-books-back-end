'use strict';

const express = require('express');
require('dotenv').config();
const cors = require('cors');

const mongoose = require('mongoose');

const PORT = process.env.PORT || 3002;
const DATABASE_URL = process.env.DATABASE_URL;

const app = express();
app.use(cors());

app.get('/', function (request, response) {
  response.send('Hello World');
});


mongoose.connect(DATABASE_URL, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
  console.log('connected to the database!');
});


const User = require('./Models/User');


app.get('/books', getAllBooks);

function getAllBooks(request, response) {
  const name = request.query.email;
  console.log({name});
  User.find({email: name}, function (err, items) {
    if (err) return console.error(err);
    console.log(items, items[0]);
    response.status(200).send(items[0].books);
  });
}

app.listen(PORT, () => console.log(`listening on ${PORT}`));
