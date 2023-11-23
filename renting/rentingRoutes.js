const Renting = require('./rentingcontroller');
module.exports = (router) => {
  router.post('/rent', Renting.rent);
}