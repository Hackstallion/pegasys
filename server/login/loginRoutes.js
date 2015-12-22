var loginQueryController = require('./loginController.js');

module.exports = function (app) {

	app.get('')('/login', loginQueryController.checkUser);
}