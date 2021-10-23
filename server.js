'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());


const db = mongoose.connection;
db.on('error', console.error.bing(console, 'connection error:'));
db.once('open', _ => {
  console.log('We\'re connected!');
});

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.listen(PORT, () => console.log(`listening on ${PORT}`));
