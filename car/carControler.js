const Car = require('./carModel')

exports.createCar = (req, res, next) => {
    const newCar = {
      platenumber: req.body.platenumber.toUpperCase(),
      brand: req.body.brand.toUpperCase(),
      state: req.body.state,
      dailyvalue: req.body.dailyvalue,
    }
    // console.log(newCar);
  
    Car.create(newCar)
    .then(respuesta => {
      console.log(respuesta);
      
      res.send({
        platenumber: req.body.platenumber,
        state: req.body.state,
        dailyvalue: req.body.dailyvalue,
      });
    })
    .catch(err => {
      console.log(err);
      if (err && err.code === 11000) return res.status(409).send('El vehiculo ya existe'); //Controla el uso de la placa
      if (err) return res.status(500).send('Server error');
    });
}

exports.getCars = async (req, res, next) => {
    try {
        const cars = await Car.find({});
        res.send(cars);
      } catch (error) {
        console.error(error);
        res.status(500).send(error);
      }
};

exports.updateCar = async(req, res, next) => {
    const { platenumber, brand, state, dailyvalue } = req.body;
    const oldPltenumber = req.params.placa;
    try {
      const car = await Car.findOneAndUpdate({'platenumber': oldPltenumber}, {platenumber, brand, state, dailyvalue} , { new: true });
      console.log(car);
      res.send(car);
    } catch (error) {
      console.error(error);
      res.status(500).send(error);
    }
};

exports.deleteCar = async(req, res, next) => {
  const placa = req.params;
  deletePlaca = placa.placa

  try {
    const car = await Car.findOneAndDelete(deletePlaca);
    res.send(car);
  } catch (error) {
    console.error(error);
    res.status(500).send(error);
  }
};