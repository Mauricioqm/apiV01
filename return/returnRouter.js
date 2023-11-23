const Return = require('./returnController');
module.exports = (router) => {
  router.post('/return/:placa', Return.return);
}