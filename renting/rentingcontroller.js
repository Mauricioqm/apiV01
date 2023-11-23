const { response } = require('express');
const Renting = require('./rentingModel');
const Car = require('../car/carModel');


exports.rent = async (req, res, next) => {
    const placa = req.body.platenumber;
    const cars = await getCars();
    const findCar = cars.find(({ platenumber }) => platenumber === placa);
    if (findCar) {
        if (findCar.state) {
            const nuemroRenta = aleatorio(1, 1000)
            try {
                const newRent = {
                    rentNumber: nuemroRenta,
                    username: req.body.username.toUpperCase(),
                    platenumber: req.body.platenumber.toUpperCase(),
                    initialDate: req.body.initialDate,
                    finalDate: req.body.finalDate,
                    status: req.body.status,
                }
                // console.log(findCar);
                Renting.create(newRent)
                .then(respuesta => {
                    const updateCarRent = updateCar(findCar.platenumber, findCar.brand, false, findCar.dailyvalue);
                    // console.log(req)
                    res.send({
                        rentNumber: req.body.rentNumber,
                        platenumber: req.body.platenumber,
                        state: req.body.status,
                    });
                })
                .catch(err => {
                    console.log('error ', err);
                    res.send('Hubo un error....');
                    if (err && err.code === 11000) return res.status(409).send('El vehiculo no esta disponible'); //Controla el uso de la placa
                    if (err) return res.status(500).send('Server error');
                });
            } catch (error) {
            console.log(error);
            res.send('Hubo un error....');
          }
            
        } else {
            res.send('El vehiculo no disponible...')
        }
    } else {
        res.send('El vehiculo no existe...')
    }
  }


getCars = async (req, res) => {
try {
    const cars = await Car.find({});
    return cars;
    } catch (error) {
    console.error(error);
    res.status(500).send(error);
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

function aleatorio(inferior, superior) {
    var numPosibilidades = superior - inferior;
    var aleatorio = Math.random() * (numPosibilidades + 1);
    aleatorio = Math.floor(aleatorio);
    return inferior + aleatorio;
}
