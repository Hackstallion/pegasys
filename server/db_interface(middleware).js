var bodyParser = require('body-parser');
var morgan = require('morgan');


module.exports = function (app, express) {
  var authRouter = express.Router(),
      driverSwitchRouter = express.Router(),
      endPointsRouter = express.Router(),
      driverRouteRouter = express.Router(),
      driversRouter = express.Router(),
      profileRouter = express.Router(),
      matchRouter = express.Router(),
      messageRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  app.use('/auth', authRouter);
  app.use('/driver', driverSwitchRouter);
  app.use('/locations', endPointsRouter);
  app.use('/driver-route', driverRouteRouter);
  app.use('/show-drivers', driversRouter);
  app.use('/profile', profileRouter);
  app.use('/matches', matchRouter);
  app.use('/messages', messageRouter);

  require('./auth/authRoutes.js')(authRouter);
  require('./driver/driverRoutes.js')(driverSwitchRouter);
  require('./locations/locationsRoutes.js')(endPointsRouter);
  require('./route/routeRoutes.js')(driverRouteRouter);
  require('./drivers/driversRoutes.js')(driversRouter);
  require('./profile/profileRoutes.js')(profileRouter);
  require('./matches/matchRoutes.js')(matchRouter);
  require('./messages/messageRoutes.js')(messageRouter);
};






