const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const carSchema = new Schema({
    platenumber: {
        type: String,
        required: [true, "Can't be blank"],
        unique: true,
        lowercase: true,
        trim: true
    },
    brand: {
        type: String,
        required: [true, "Can't be blank"],
        unique: false,
        lowercase: true,
        trim: true
    },
    state: {
        type: Boolean,
        required: [true, "Can't be blank"],
    },
    dailyvalue: {
        type: Number,
        required: [true, "Can't be blank"],
        trim: true
    },
},
    { minimize: false },
)

carSchema.method.toJSON = function (){
    const car = this;
    const carObject = car.userObject();
    delete carObject;
    return carObject
}

carSchema.statics.findOne = async function(brand, platenumber) {
    const Car = await Car.findOne({platenumber});
    if(!Car) throw new Error('.....');
  }


const Car = mongoose.model('Car', carSchema);

module.exports = Car;