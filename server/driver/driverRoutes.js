var driverController = require('./driverController.js');

module.exports = function (app) {

  app.put('/driver', driverController.switchDriver);
}
