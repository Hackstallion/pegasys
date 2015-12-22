var signupQueryController = require('./signupController.js');

module.exports = function (app) {

  app.get('/signup', signupQueryController.signup);
}