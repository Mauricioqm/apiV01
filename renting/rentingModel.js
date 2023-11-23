const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
module.exports = Renting;