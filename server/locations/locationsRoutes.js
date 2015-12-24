var locationsController = require('./locationsController.js');

module.exports = function (app) {

  app.put('/setTrip', locationsController.setInitial);
}
