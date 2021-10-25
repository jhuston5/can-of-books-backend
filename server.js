'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const seedBook = require('./modules/seedBook.js');
app.use(cors());
const BookModel = require('./modules/book.js');
const bombTheBase = require('./modules/clear');

const PORT = process.env.PORT || 3001;



// GET Statements
app.get('/', (request, response) => {
  response.status(200).send('Welcome to server');
})

app.get('/seed', seedBook);
app.get('/clear', bombTheBase);

app.get('/allBooks', (req, res) => {
  BookModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
    res.status(200).send(item);
  }
  });
});

app.get('*', (request, response) => {
  response.status(500).send('Route not found');
})




// Mongoose Connection
mongoose.connect(process.env.MONGO_CONNECTION_STRING,
  { useNewUrlParser: true, useUnifiedTopology: true }
);


const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');
});


// Handle Errors
BookModel.find((err, item) => {
  if (err) return console.error(err);
  console.log('This is the item', item);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
