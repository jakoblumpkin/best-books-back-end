'use strict';

const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  name: {type: String},
  description: {type: String},
  status: {type: String}
});

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  books: [booksSchema]
});

const User = mongoose.model('BookParent', userSchema);


const jakob = new User({
  email: 'lumpkinjakobr@gmail.com',
  books: [{name: 'Out Winning The Devil', description: 'Preventing addictions', status: 'on hold'},
    {name: 'Rich Dad Poor Dad', description: 'Financial counseling', status: 'available'}]
});
jakob.save();


const jessi = new User({
  email: 'jessivelazq1@gmail.com',
  books: [{name: 'Centennial', description: 'History of Colorado', status: 'on hold'},
    {name: 'Lord of the Rings', description: 'Epic Fantasy Novel', status: 'available'}]
});
jessi.save();

module.exports = User;
