var routeController = require('./routeController.js');

module.exports = function (app) {

  app.put('/setRoute', routeController.setRoute);
}
