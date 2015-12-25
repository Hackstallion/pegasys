var driversController = require('./driversController.js');

module.exports = function (app) {

  app.get('/getDrivers', driversController.getDrivers);
}
