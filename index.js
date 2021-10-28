'use strict';

require('dotenv').config();
let mongoose = require('mongoose');
let server = require('./server.js');

mongoose.connect(process.env.MONGODB_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log('Database connected!'))
  .catch(err => console.log(err));

const port = process.env.PORT || 3000;

server.start(port);
