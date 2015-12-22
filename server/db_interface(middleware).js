var bodyParser = require('body-parser');
var morgan = require('morgan');
var express = require('express')
var app = express();



module.exports = function (app, express) {
	var loginRouter = express.Router();
	var signUpRouter = express.Router();
	var driverSwitchRouter = express.Router();
	var endPointsRouter = express.Router();
	var driverRouteRouter = express.Router();
	var driversRouter = express.Router();
	var profileRouter = express.Router();
	var matchRouter = express.Router();
	var inboxRouter = express.Router();
	var sentRouter = express.Router();



app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../../client'));

// app.use('/api/users', userRouter); // use user router for all user request
// app.use('/api/links', linkRouter); // user link router for link request
app.use('/api/login',loginRouter);
app.use('api/signup', signUpRouter);
app.use('api/driver', driverSwitchRouter);
app.use('api/locations', endPointsRouter);
app.use('api/driver-route', driverRouteRouter);
app.use('api/show-drivers', driversRouter);
app.use('api/profile', profileRouter);
app.use('api/matches', matchRouter);
app.use('api/inbox', inboxRouter);
app.use('api/sent-messages', sentRouter);
  // app.use(helpers.errorLogger);
  // app.use(helpers.errorHandler);

require('./login/loginRoutes.js')(loginRouter);
// require('../sent/sentRoutes.js')(sentRouter);

}


