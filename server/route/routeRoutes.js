var routeController = require('./routeController.js');

module.exports = function (app) {

  app.post('/setRoute', routeController.setRoute);
}
