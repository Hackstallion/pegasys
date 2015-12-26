var matchController = require('./matchController.js');

module.exports = function (app) {

  app.post('/accept', matchController.acceptRequest);
  app.post('/request', matchController.requestMatch);
  app.post('/unmatch', matchController.unmatch);
}
