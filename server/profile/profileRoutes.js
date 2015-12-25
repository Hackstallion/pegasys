var profileController = require('./profileController.js');

module.exports = function (app) {

  app.post('/updateProfile', profileController.updateProfile);
  app.get('/getProfile', profileController.getProfile);
}
