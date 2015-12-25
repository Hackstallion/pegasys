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

  app.use(express.static(__dirname + '/../../client')); //(/client)?

  app.use('/login',loginRouter);
  app.use('/signup', signUpRouter);
  app.use('/driver', driverSwitchRouter);
  app.use('/locations', endPointsRouter);
  app.use('/driver-route', driverRouteRouter);
  app.use('/show-drivers', driversRouter);
  app.use('/profile', profileRouter);
  app.use('/matches', matchRouter);
  app.use('/inbox', inboxRouter);
  app.use('/sent-messages', sentRouter);
    // app.use(helpers.errorLogger);
    // app.use(helpers.errorHandler);

  require('./login/loginRoutes.js')(loginRouter);
  require('./signup/signupRoutes.js')(signUpRouter);
  require('./driver/driverRoutes.js')(driverSwitchRouter);
};






