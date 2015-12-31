var locationsController = require('./locationsController.js');

module.exports = function (app) {

  app.post('/setroute', locationsController.setRoute);
  app.post('/newtrip', locationsController.newTrip);
  app.post('/deltrip', locationsController.delTrip);
}
