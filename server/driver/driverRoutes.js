var driverController = require('./driverController.js');

module.exports = function (app) {

  app.post('/driver', driverController.switchDriver);
}