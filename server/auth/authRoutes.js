var signupController = require('./signupController.js');
var loginController = require('./loginController.js');
var signoutController = require('./signoutController.js');

module.exports = function (app) {

  app.post('/signup', signupController.signup);
  app.post('/login', loginController.checkUser);
  app.post('/signout', signoutController.signout);
}

