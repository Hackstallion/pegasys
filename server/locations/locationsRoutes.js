var locationsController = require('./locationsController.js');

module.exports = function (app) {

  app.post('/newtrip', locationsController.newTrip);
  app.post('/deltrip', locationsController.delTrip);
}
