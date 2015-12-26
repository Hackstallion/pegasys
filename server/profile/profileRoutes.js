var profileController = require('./profileController.js');

module.exports = function (app) {

//The app will distinguish between post and get
//requests so further extensions aren't necessary.
  app.post('', profileController.updateProfile);
  app.get('', profileController.getProfile);
}
