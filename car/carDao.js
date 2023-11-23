const mongoose = require('mongoose');
const authSchema = require('./authModel');
const carSchema = require('./carModel');

carSchema.statics = {
  create: function (data, cb) {
    const car = new this(data);
    car.save(cb);
  },
  read: function (data, cb) {
    car.read(cb);
  }
//   login: function (query, cb) {
//     this.find(query, cb);
//   }
}

const carModel = mongoose.model('Cars', carSchema);
module.exports = carModel;