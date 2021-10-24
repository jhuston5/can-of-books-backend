const mongoose = require('mongoose');
const BookModel = require('./book');


function seedBook(req, res) {
  //Sample data entry
  const seedArr = [
    {  title: 'Moby Dick', description: 'Hunted Whale', status: 'CHECKEDIN', email: 'someemail@gmail.com' },
    {title: 'Pride and Prejudice', description: 'Elizabeth <3 Darcy', status: 'CHECKEDIN', email: 'someotheremail@gmail.com'},
    {title: 'Les Miserables', description: 'Miserable French People', status: 'CHECKEDIN', email: 'yetanotheremail@gmail.com'}
  ]
  seedArr.forEach(seed => {
    let entry = new BookModel(seed);
    entry.save();
  });
  
  res.status(200).send('Seeded Database');
}

module.exports = seedBook;