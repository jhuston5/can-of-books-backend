const mongoose = require('mongoose');

const { Schema } = mongoose;

const bookSchema = new mongoose.Schema({
  title: {type: String},
  description: {type: String},
  status: {type: String, uppercase: true, enum: ['CHECKEDIN', 'CHECKEDOUT']},
  email: {type: String}
})

const BookModel = mongoose.model('bookShelf', bookSchema);

module.exports = BookModel;
