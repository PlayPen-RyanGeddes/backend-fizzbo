'use strict';

const mongoose = require('mongoose');
require('mongoose-schema-jsonschema')(mongoose);

const listings = mongoose.Schema({
  address: { type: String, required: true },
  zipcode:{ type: Number, required:true },
  salesprice: { type: String, required:true },
  // imageUrl: { type: String, required:true },
  // creatorUserName: { type: String, required:true },
  // creatorUserId: { type: String, required:true },
  // forsale: { type: Boolean, required:true },
  // photos:[], //TODO lookup if I need to create a schema for photos array. See below comments.
  //TODO look at gitlab for ideas on how listing schema is structured
});

module.exports = mongoose.model('listings', listings);

//Arrays
//Mongoose supports arrays of SchemaTypes and arrays of subdocuments.
// Arrays of SchemaTypes are also called primitive arrays, and 
//arrays of subdocuments are also called document arrays.
//const ToySchema = new Schema({ name: String });
// const ToyBoxSchema = new Schema({
//   toys: [ToySchema],
//   buffers: [Buffer],
//   strings: [String],
//   numbers: [Number]
//   // ... etc
// });
//example array schema at docs:/
//https://mongoosejs.com/docs/schematypes.html#arrays


//https://stackoverflow.com/questions/33049707/push-items-into-mongo-array-via-mongoose