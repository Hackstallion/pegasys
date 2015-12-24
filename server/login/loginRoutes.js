var loginQueryController = require('./loginController.js');

module.exports = function (app) {

  app.post('/login', loginQueryController.checkUser);
}