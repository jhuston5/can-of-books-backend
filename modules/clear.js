const mongoose = require('mongoose');
const BookModel = require('./book');


async function bombTheBase(req, res) {
  try {
    await BookModel.deleteMany({});
    console.log('Database cleared')
      ;
    res.status(200).send('cleared');
  }
  catch (e) {
    console.log('error:', e.message);
  }
}

module.exports = bombTheBase;