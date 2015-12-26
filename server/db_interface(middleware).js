var bodyParser = require('body-parser');
var morgan = require('morgan');
<<<<<<< HEAD
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

=======


module.exports = function (app, express) {
  var authRouter = express.Router(),
      driverSwitchRouter = express.Router(),
      endPointsRouter = express.Router(),
      driverRouteRouter = express.Router(),
      driversRouter = express.Router(),
      profileRouter = express.Router(),
      matchRouter = express.Router(),
      messageRouter = express.Router();
>>>>>>> b534d81bb75af54e19e39078e03d80f6fcdb7106

  app.use(morgan('dev'));
  app.use(bodyParser.json());

<<<<<<< HEAD
  app.use(express.static(__dirname + '/../client'));
  app.use('/login',loginRouter);
  app.use('/signup', signUpRouter);
=======
  app.use('/auth', authRouter);
>>>>>>> b534d81bb75af54e19e39078e03d80f6fcdb7106
  app.use('/driver', driverSwitchRouter);
  app.use('/locations', endPointsRouter);
  app.use('/driver-route', driverRouteRouter);
  app.use('/show-drivers', driversRouter);
  app.use('/profile', profileRouter);
  app.use('/matches', matchRouter);     //***
  app.use('/messages', messageRouter);  //***

  require('./auth/authRoutes.js')(authRouter);
  require('./driver/driverRoutes.js')(driverSwitchRouter);
  require('./locations/locationsRoutes.js')(endPointsRouter);
  require('./route/routeRoutes.js')(driverRouteRouter);
  require('./drivers/driversRoutes.js')(driversRouter);
  require('./profile/profileRoutes.js')(profileRouter);
  // require('./matches/matchRoutes.js')(matchRouter);
  require('./messages/messageRoutes.js')(messageRouter);
};






