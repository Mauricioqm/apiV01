const Cars = require('./carControler');
module.exports = (router) => {
  router.get('/cars', Cars.getCars);
  router.post('/car', Cars.createCar);
  router.put('/updateCar/:placa', Cars.updateCar);
  router.delete('/deleteCar/:placa', Cars.deleteCar);
}