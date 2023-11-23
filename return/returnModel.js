const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const returnSchema = new Schema({
  returnnumber: {
    type: Number,
    required: [true, "Can't be blank"],
    unique: false,
  },
  rentnnumber: {
    type: Number,
    required: [true, "Can't be blank"],
    unique: false
  },
  returndate: {
    type: String,
    required: [true, "Can't be blank"],
    trim: true
  }
},
  { minimize: false },
);


const Return = mongoose.model('Return', returnSchema);
module.exports = Return;