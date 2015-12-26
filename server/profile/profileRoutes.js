var profileController = require('./profileController.js');

module.exports = function (app) {

  app.post('', profileController.updateProfile);
  app.get('', profileController.getProfile);
}
