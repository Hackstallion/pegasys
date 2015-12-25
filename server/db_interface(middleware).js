var bodyParser = require('body-parser');
var morgan = require('morgan');


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
  app.use(express.static(__dirname + '/../client'));

  app.use('/login',loginRouter);
  app.use('/signup', signUpRouter);
  app.use('/driver', driverSwitchRouter);
  app.use('/locations', endPointsRouter);
  app.use('/driver-route', driverRouteRouter);
  app.use('/show-drivers', driversRouter);
  app.use('/profile', profileRouter);
  app.use('/matches', matchRouter);       //***
  app.use('/inbox', inboxRouter);         //***
  app.use('/sent-messages', sentRouter);  //***

  require('./login/loginRoutes.js')(loginRouter);
  require('./signup/signupRoutes.js')(signUpRouter);
  require('./driver/driverRoutes.js')(driverSwitchRouter);
  require('./locations/locationsRoutes.js')(endPointsRouter);
  require('./route/routeRoutes.js')(driverRouteRouter);
  require('./drivers/driversRoutes.js')(driversRouter);
  require('./profile/profileRoutes.js')(profileRouter);
};






