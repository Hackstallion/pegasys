var signupQueryController = require('./signupController.js');

module.exports = function (app) {

  app.post('/signup', signupQueryController.signup);
}