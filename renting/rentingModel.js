const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const DB = require('../config/db');
// autoIncrement = require('mongoose-auto-increment');

// var connection = mongoose.createConnection(DB);
// autoIncrement.initialize(connection);

const rentingSchema = new Schema({
  rentNumber: {
    type: Number,
    // required: [true, "Can't be blank"],
    unique: true,
    },  
  username: {
    type: String,
    required: [true, "Can't be blank"],
    // lowercase: true,
    trim: true
  },
  platenumber: {
    type: String,
    required: [true, "Can't be blank"],
    lowercase: true,
    trim: true
  },
  initialDate: {
    type: String,
    required: [true, "Can't be blank"],
    trim: true
  },
  finalDate: {
    type: String,
    required: [true, "Can't be blank"],
    trim: true
  },
  status: {
    type: String,
    required: [true, "Can't be blank"],
    trim: true
  }
},
  { minimize: false },
);

const Renting = mongoose.model('Renting', rentingSchema);
// rentingSchema.plugin(autoIncrement.plugin, { model: 'Renting', field: 'rentNumber' });
module.exports = Renting;