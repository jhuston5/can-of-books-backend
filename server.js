'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const seedBook = require('./modules/seedBook.js');
app.use(cors());
app.use(express.json());
const BookModel = require('./modules/book.js');
const bombTheBase = require('./modules/clear');

const PORT = process.env.PORT || 3001;



// GET Statements
app.get('/', (request, response) => {
  response.status(200).send('Welcome to server');
})

app.get('/test', (req, res) => res.status(200).send('Test Complete'));
app.post('/test/:info', (req, res) => {
  console.log('\nQuery:', req.query, '\nParams:', req.params, '\nBody:', req.body);
  res.status(200).send('Posted');
})

app.get('/seed', seedBook);
app.get('/clear', bombTheBase);
app.delete('/allBooks/:id', deleteBook);
app.put('/allBooks/:id', putBook);


app.get('/allBooks', (req, res) => {
  BookModel.find((err, item) => {
    if (err) return res.status(500).send(err);
    else {
      res.status(200).send(item);
    }
  });
});

// Lab 12
app.post('/allBooks', postBook);

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


async function postBook(req, res) {

  let postObj = req.body
  try {
    let postEntry = BookModel(postObj);
    postEntry.save();

    res.status(200).send(postObj);
  }
  catch {
    res.status(500).send('error:', err.message);
  }

}

async function deleteBook(req, res) {
  let { id } = req.params;
  console.log(id);
  try {
    let deletedObj = await BookModel.findByIdAndDelete(id);
    res.status(200).send(deletedObj);
  }
  catch {
    res.status(500).send('error:', err.message);
  }
}


async function putBook(req, res) {
  let putObj = req.body;
  let id = req.params.id;

  try {
    const updatedObj = await BookModel.findByIdAndUpdate(id, putObj, { new: true, overwrite: true });
    res.status(200).send(updatedObj);
  }
  catch (err) {
    res.status(500).send(`Unable to perform PUT: ${err.message}`);
  }
}


// Handle Errors
BookModel.find((err, item) => {
  if (err) return console.error(err);
  console.log('This is the item', item);
});

app.listen(PORT, () => console.log(`listening on ${PORT}`));
