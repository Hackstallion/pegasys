var signupController = require('./signupController.js'),
    loginController = require('./loginController.js'),
    signoutController = require('./signoutController.js');

module.exports = function (app) {

  app.post('/signup', signupController.signup);
  app.post('/login', loginController.checkUser);
  app.get('/signout', signoutController.signout);
}

