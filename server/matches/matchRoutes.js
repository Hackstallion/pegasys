var matchController = require('./matchController.js');

module.exports = function (app) {

  app.put('/accept', matchController.acceptRequest);
  app.put('/request', matchController.requestMatch);
  app.put('/unmatch', matchController.unmatch);
}
