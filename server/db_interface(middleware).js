var bodyParser = require('body-parser');
var morgan = require('morgan');


module.exports = function (app, express) {
  var authRouter = express.Router(),
      endPointsRouter = express.Router(),
      driverRouteRouter = express.Router(),
      driversRouter = express.Router(),
      profileRouter = express.Router(),
      matchRouter = express.Router(),
      messageRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  app.use('/api/auth', authRouter);
  app.use('/api/locations', endPointsRouter);
  app.use('/api/driver-route', driverRouteRouter);
  app.use('/api/show-drivers', driversRouter);
  app.use('/api/profile', profileRouter);
  app.use('/api/matches', matchRouter);
  app.use('/api/messages', messageRouter);

  require('./auth/authRoutes.js')(authRouter);
  require('./locations/locationsRoutes.js')(endPointsRouter);
  require('./route/routeRoutes.js')(driverRouteRouter);
  require('./drivers/driversRoutes.js')(driversRouter);
  require('./profile/profileRoutes.js')(profileRouter);
  require('./matches/matchRoutes.js')(matchRouter);
  require('./messages/messageRoutes.js')(messageRouter);
};






