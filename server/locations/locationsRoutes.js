var locationsController = require('./locationsController.js');

module.exports = function (app) {

  app.post('/setTrip', locationsController.setInitial);
}