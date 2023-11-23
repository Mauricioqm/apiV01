const { response } = require('express');
const Return = require('./returnModel');
const Renting = require('../renting/rentingModel');
const Car = require('../car/carModel');

exports.return = async(req, res, next) => {
    const placa = req.params.placa;
    console.log(placa);
    const cars = await getCarsRents();
    const findCar = cars.find(({ platenumber }) => platenumber === placa);
    console.log(findCar);
    if (findCar) {
        const numeroRenta = aleatorio(1, 1000)
        try {
            const newReturn = {
                returnnumber: numeroRenta,
                rentnnumber: req.body.rentnnumber,
                returndate: req.body.returndate,
            }
            Return.create(newReturn)
            .then(respuesta => {
                const updateCarRent = updateCar(findCar.platenumber, findCar.brand, true, findCar.dailyvalue);
                res.send({
                    // rentNumber: req.body.rentNumber,
                    platenumber: findCar.platenumber,
                    state: req.body.status,
                });
            });
        } catch (err) {
            console.log(err);
        }
        
    } else {
        res.send('Por favor valide la placa del vehiculo...')
    }
}

updateCar = async (platenumber, brand, state, dailyvalue) => {
    try {
      const car = await Car.findOneAndUpdate({platenumber}, {platenumber, brand, state, dailyvalue} , { new: true });
      return car;
    } catch (error) {
      console.error('-----', error);
    }
};

getCarsRents = async (req, res) => {
    try {
        const cars = await Renting.find({});
        return cars;
      } catch (error) {
        console.error(error);
      }
}

function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
}